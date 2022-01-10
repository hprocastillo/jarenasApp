import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {ChecklistService} from "../../../../../core/services/checklist.service";
import {Category, Checklist, Verification} from "../../../../../core/interfaces/checklist";
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-checklist-current',
  templateUrl: './view-checklist-current.component.html',
  styleUrls: ['./view-checklist-current.component.scss']
})
export class ViewChecklistCurrentComponent implements OnInit, OnChanges, OnDestroy {
  //INPUTS AND OUTPUTS
  checklistId: string | any;
  userId: string | any;
  userEmail: string | any;
  employeeId: string | any;
  //VARIABLES
  today = new Date();
  basePath: string = '/images';
  downloadURL: string = '';
  task: AngularFireUploadTask | undefined;
  //RESULTS
  verificationId: string | any;
  verification = {} as Verification;
  checklist = {} as Checklist;
  listCategories: Category[] = [];
  //UNSUBSCRIBE METHOD
  private unsubscribe$ = new Subject<void>();

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage,
    private checklistSvc: ChecklistService) {
  }

  ngOnInit(): void {
    //GET FROM URL
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.checklistId = params['id'];
        this.userId = params['userId'];
        this.userEmail = params['userEmail'];
        this.employeeId = params['employeeId'];
      }
    );
    //GET LIST CATEGORIES
    this.checklistSvc.getCategories().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (res: Category[]) => {
        this.listCategories = res;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    //VERIFIED IF USER VERIFICATION CHECKLIST EXISTS
    if (this.checklistId && this.employeeId && this.userId) {
      this.checklistSvc.getVerificationsByChecklistByEmployee(this.checklistId, this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Verification[]) => {
          if (res.length === 0) {
            let verification = {} as Verification;
            let verificationId = verification?.id || null;
            verification.active = true;
            verification.finished = false;
            verification.employeeId = this.employeeId;
            verification.checklistId = this.checklistId;
            verification.createdBy = this.userId;
            // @ts-ignore
            verification.createdAt = this.today;
            this.checklistSvc.saveVerification(verification, verificationId).then();
          } else {
            this.verificationId = res[0].id;
            //GET VERIFICATION
            this.checklistSvc.getVerificationById(this.verificationId).pipe(
              takeUntil(this.unsubscribe$)
            ).subscribe(
              (res: any) => {
                this.verification = res;
              }
            );
          }
        }
      );
    }
    //GET CHECKLIST DATA
    if (this.checklistId) {
      this.checklistSvc.getChecklistById(this.checklistId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: any) => {
          this.checklist = res;
        }
      );
    }
  }

  async getPhoto(event: any, checklistId: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filePath = `${this.basePath}/${file.name}`;
      this.task = this.storage.upload(filePath, file);

      (await this.task).ref.getDownloadURL().then(url => {
        this.downloadURL = url;
      });

      this.checklistSvc.getVerificationsByChecklistByEmployee(checklistId, this.employeeId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (res: Verification[]) => {
          if (res.length > 0) {
            let verification = {} as Verification;
            let verificationId: string | any = res[0].id;
            verification.photoUrl = this.downloadURL;
            verification.updatedBy = this.userId;
            // @ts-ignore
            verification.updatedAt = this.today;
            this.checklistSvc.updateVerification(verification, verificationId).then();
          }
        }
      );
    }
  }

  async getDeletePhoto(userId: string, verificationId: string) {
    if (confirm("Desea quitar la foto?")) {
      this.verification.updatedBy = userId;
      // @ts-ignore
      this.verification.updatedAt = this.today;
      this.verification.photoUrl = '';
      this.downloadURL = '';
      await this.checklistSvc.updateVerification(this.verification, verificationId).then();
    }
  }

  getFinish(checklist: Checklist) {
    if (checklist.id) {
      if (confirm("Está seguro que desea finalizar el checklist?. Si lo hace no podrá volver a modificarlo.")) {
        this.checklistSvc.getVerificationsByChecklistByEmployee(checklist.id, this.employeeId).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
          (res: Verification[]) => {

            if (res.length > 0) {
              let verification = {} as Verification;
              let verificationId: string | any = res[0].id;
              verification.finished = true;
              verification.updatedBy = this.userId;
              // @ts-ignore
              verification.updatedAt = this.today;
              this.checklistSvc.updateVerification(verification, verificationId).then();
            }
          }
        );
      }
    }
  }

  getBack() {
    this.location.back();
  }

  getPdf(userId: string, employeeId: string, verificationId: string, checklistId: string) {
    this.router.navigate(['logistics/checklist/export', userId, employeeId, verificationId, checklistId]).then();
  }

  getHome() {
    this.router.navigate(['logistics']).then();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

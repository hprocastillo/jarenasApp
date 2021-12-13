import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Answer, Category, Checklist, Question, Verification} from "../interfaces/checklist";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ChecklistService {
  //COLLECTIONS
  checklistsCollection: AngularFirestoreCollection<Checklist>;
  categoriesCollection: AngularFirestoreCollection<Category>;
  questionsCollection: AngularFirestoreCollection<Question>;
  answersCollection: AngularFirestoreCollection<Answer>;
  verificationsCollection: AngularFirestoreCollection<Verification>;

  constructor(private readonly afs: AngularFirestore) {
    this.checklistsCollection = afs.collection<Checklist>('checklists', ref => ref
      .orderBy('createdAt', 'desc'));
    this.categoriesCollection = afs.collection<Category>('categories', ref => ref
      .orderBy('createdAt', 'desc'));
    this.questionsCollection = afs.collection<Question>('questions', ref => ref
      .orderBy('createdAt', 'desc'));
    this.answersCollection = afs.collection<Answer>('answers', ref => ref
      .orderBy('createdAt', 'desc'));
    this.verificationsCollection = afs.collection<Verification>('verifications', ref => ref
      .orderBy('createdAt', 'desc'));
  }

  //CHECKLIST SERVICE//
  getChecklists(companyId: string) {
    return this.afs.collection<Checklist>('checklists', ref => ref
      .where('companyId', '==', companyId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Checklist;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getChecklistsActiveAndPublish() {
    return this.afs.collection<Checklist>('checklists', ref => ref
      .where('active', '==', true)
      .where('publish', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Checklist;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getChecklistsInactive(companyId: string) {
    return this.afs.collection<Checklist>('checklists', ref => ref
      .where('companyId', '==', companyId)
      .where('publish', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Checklist;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  getChecklistById(id: string) {
    return this.afs.collection<Checklist>('checklists').doc(id).valueChanges();
  }

  saveChecklist(checklist: Checklist, checklistId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = checklistId || this.afs.createId();
        const data = {id, ...checklist};
        const result = await this.checklistsCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  updateChecklist(checklist: Checklist, checklistId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = checklistId;
        const data = {id, ...checklist};
        const result = await this.checklistsCollection.doc(id).update(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  deleteChecklist(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.checklistsCollection.doc(id).delete();
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }


  //CATEGORY SERVICE//
  getCategories() {
    return this.afs.collection<Category>('categories', ref => ref
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  saveCategory(category: Category, categoryId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = categoryId || this.afs.createId();
        const data = {id, ...category};
        const result = await this.categoriesCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  deleteCategory(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.categoriesCollection.doc(id).delete();
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  //QUESTION SERVICE
  getQuestionsByCategory(checklistId: string, categoryId: string) {
    return this.afs.collection<Question>('questions', ref => ref
      .where('categoryId', '==', categoryId)
      .where('checklistId', '==', checklistId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Question;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getQuestionById(id: string) {
    return this.afs.collection<Question>('questions').doc(id).valueChanges();
  }

  saveQuestion(question: Question, questionId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = questionId || this.afs.createId();
        const data = {id, ...question};
        const result = await this.questionsCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  updateQuestion(question: Question, questionId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = questionId;
        const data = {id, ...question};
        const result = await this.questionsCollection.doc(id).update(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  deleteQuestion(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.questionsCollection.doc(id).delete();
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  //ANSWER SERVICE//
  getAnswers(checklistId: string, categoryId: string, questionId: string, employeeId: string) {
    return this.afs.collection<Answer>('answers', ref => ref
      .where('checklistId', '==', checklistId)
      .where('categoryId', '==', categoryId)
      .where('questionId', '==', questionId)
      .where('employeeId', '==', employeeId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Answer;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getHistoricalAnswers(companyId: string, checklistId: string, questionId: string, employeeId: string) {
    return this.afs.collection<Answer>('answers', ref => ref
      .where('companyId', '==', companyId)
      .where('checklistId', '==', checklistId)
      .where('questionId', '==', questionId)
      .where('employeeId', '==', employeeId)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Answer;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  saveAnswer(answer: Answer, answerId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = answerId || this.afs.createId();
        const data = {id, ...answer};
        const result = await this.answersCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  updateAnswer(answer: Answer, answerId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = answerId;
        const data = {id, ...answer};
        const result = await this.answersCollection.doc(id).update(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  //VERIFICATION SERVICE//
  getVerificationsByChecklistByEmployee(checklistId: string, employeeId: string) {
    return this.afs.collection<Verification>('verifications', ref => ref
      .where('employeeId', '==', employeeId)
      .where('checklistId', '==', checklistId)
      .where('active', '==', true)
      .orderBy('createdAt', 'desc'))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Verification;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getVerificationById(id: string) {
    return this.afs.collection<Verification>('verifications').doc(id).valueChanges();
  }

  saveVerification(verification: Verification, verificationId: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = verificationId || this.afs.createId();
        const data = {id, ...verification};
        const result = await this.verificationsCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }

  updateVerification(verification: Verification, verificationId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = verificationId;
        const data = {id, ...verification};
        const result = await this.verificationsCollection.doc(id).update(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  }
}

import Ember from 'ember';

export default Ember.Controller.extend({
    quizObject: {},
    userInsession: null,
    isSIgnedIn: null,
    fromDate: null,
    toDate: null,
    addQuestionComponent: null,
    actions: {
        goBackToHomePage() {
            this.transitionToRoute('application');
        },
        addQuestions(quizObject) {
            //if (this.get('toDate') > this.get('fromDate')) {
            if (quizObject.questions === undefined) {
                quizObject.questions = new Array();
            }
            quizObject.fromDate = this.get('fromDate');
            quizObject.toDate = this.get('toDate');
            this.set('quizObject', quizObject);
            this.set('addQuestionComponent', 'quiz-add-questions');
            this.send('doFormAnimation');
            //  }
        },
        setFromDate(fromDate) {
            this.set('fromDate', new Date(fromDate));
        },
        setFromTime(fromTime) {
            let fromDate = this.get('fromDate');
            let fromTimeHours = fromTime.match(/[a-zA-Z]+|[0-9]+/g)[0];
            let fromTimeMinutes = fromTime.match(/[a-zA-Z]+|[0-9]+/g)[1];

            fromDate.setHours(fromTimeHours);
            fromDate.setMinutes(fromTimeMinutes);
            fromDate.setSeconds('00');
            this.set('fromDate', fromDate);
        },
        setToDate(toDate) {
            this.set('toDate', new Date(toDate));
        },
        setToTime(toTime) {
            let toDate = this.get('toDate');
            let toTimeHours = toTime.match(/[a-zA-Z]+|[0-9]+/g)[0];
            let toTimeMinutes = toTime.match(/[a-zA-Z]+|[0-9]+/g)[1];

            toDate.setHours(toTimeHours);
            toDate.setMinutes(toTimeMinutes);
            toDate.setSeconds('00');
            this.set('toDate', toDate);
        },
        doFormAnimation() {
            Ember.$('.create-quiz-card').fadeOut(1000);
        }
    }
});

import Ember from 'ember';

export default Ember.Component.extend({

    quizObject: {},

    actions: {
        createQuizObject(quizObject) {
            this.sendAction('createQuizObject', quizObject);
        },

        selectQuizType() {
            this.set('quizObject.type', Ember.$('#quiz_type').val());
        }
    },

    didInsertElement() {
        const _this = this;
        this.set('quizObject.timeLimit', 60);
        Ember.run.next(function() {
            _this.setupDatePicker();
            _this.setupTimePicker();
            _this.bindTimeElements();
            _this.initiateOtherMaterializeElements();
        });
    },

    setupDatePicker() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 1, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true // Close upon selecting a date,
        });
    },

    setupTimePicker() {
        $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: true, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button
            autoclose: true, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            aftershow: function() {} //Function for after opening timepicker
        });
    },

    bindTimeElements() {
        let _this = this;

        Ember.$('label[for="time_limit"]').text('Minutes: 60');

        Ember.$('#time_limit').on('change', function() {
            Ember.$('label[for="time_limit"]').text('Minutes: ' + Ember.$('#time_limit').val());
            _this.set('quizObject.timeLimit', Number.parseInt(Ember.$('#time_limit').val()));
        });

        $('#from_date').on('change', function() {
            _this.setFromDate(Ember.$(this).val());
        });

        $('#from_time').on('change', function() {
            _this.setFromTime(Ember.$(this).val());
        });

        $('#to_date').on('change', function() {
            _this.setToDate(Ember.$(this).val());
        });

        $('#to_time').on('change', function() {
            _this.setToTime(Ember.$(this).val());
        });
    },

    initiateOtherMaterializeElements() {
        let _this = this;
        $('select').material_select();

        $('#posted_for').autocomplete({
            data: this.get('model.data'),
            limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function(val) {
                let studentChip = `<div class="chip"><img src="assets/images/dev.png" alt="Contact Person">${val}</div>`;
                Ember.$('#participants-selector').append(studentChip);
                Ember.$('#posted_for').val("");
                _this.addParticipantsInQuizObject(val);
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });

    },

    setFromDate(fromDate) {
        this.set('quizObject.fromDate', new Date(fromDate));
    },
    setFromTime(fromTime) {
        let fromDate = this.get('quizObject.fromDate');
        let fromTimeHours = fromTime.match(/[a-zA-Z]+|[0-9]+/g)[0];
        let fromTimeMinutes = fromTime.match(/[a-zA-Z]+|[0-9]+/g)[1];

        fromDate.setHours(fromTimeHours);
        fromDate.setMinutes(fromTimeMinutes);
        fromDate.setSeconds('00');
        this.set('quizObject.fromDate', fromDate);
    },
    setToDate(toDate) {
        this.set('quizObject.toDate', new Date(toDate));
    },
    setToTime(toTime) {
        let toDate = this.get('quizObject.toDate');
        let toTimeHours = toTime.match(/[a-zA-Z]+|[0-9]+/g)[0];
        let toTimeMinutes = toTime.match(/[a-zA-Z]+|[0-9]+/g)[1];

        toDate.setHours(toTimeHours);
        toDate.setMinutes(toTimeMinutes);
        toDate.setSeconds('00');
        this.set('quizObject.toDate', toDate);
    },

    addParticipantsInQuizObject(participant) {
        var postedForArray = this.get('quizObject.postedFor');
        if (!postedForArray) {
            postedForArray = [];
        }
        postedForArray.push(this.get('model.data')[participant]);
        this.set('quizObject.postedFor', postedForArray);
    }

});

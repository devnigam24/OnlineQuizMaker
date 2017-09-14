import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
    actions: {
        didTransition: function() {
            const _this = this;
            Ember.run.next(function() {
                _this.send('setupDatePicker');
                _this.send('setupTimePicker');
                _this.send('bindTimeElements');
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
            let controller = this.controllerFor('create-quiz');
            $('label[for="time_limit"]').text('Minutes: 60');
            controller.set('timeLimit', '60');
            $('#time_limit').on('change', function(event) {
                $('label[for="time_limit"]').text('Minutes: ' + $('#time_limit').val());
                controller.set('timeLimit', $('#time_limit').val());
            });

            $('#from_date').on('change', function() {
                controller.send('setFromDate', $(this).val());
            });

            $('#from_time').on('change', function() {
                controller.send('setFromTime', $(this).val());
            });

            $('#to_date').on('change', function() {
                controller.send('setToDate', $(this).val());
            });

            $('#to_time').on('change', function() {
                controller.send('setToTime', $(this).val());
            });
        }

    }
});

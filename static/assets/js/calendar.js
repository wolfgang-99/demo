      document.addEventListener('DOMContentLoaded', function () {
            // Initialize FullCalendar inside the modal
            var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
                initialView: 'dayGridMonth', // You can change the initial view as needed
                selectable: true, // Allow date selection
                select: function (info) {
                    var startDate = info.startStr;
                    // Function to calculate the end date based on the selected interval
                function calculateEndDate(interval) {
                    var endDate = new Date(info.start);
                    endDate.setDate(endDate.getDate() + interval);
                    return endDate;
                }
                // Function to update the calendar with the selected date range
                function updateCalendarDateRange() {
                    var startDate = calendar.getSelection().startStr;
                    var endDate = calendar.getSelection().endStr;

                    // Remove any existing highlighted events
                    calendar.getEvents().forEach(function (event) {
                        event.remove();
                    });
                    // Add an event to highlight the selected date range
                    calendar.addEvent({
                        title: 'Selected Ad Duration',
                        start: startDate,
                        end: endDate,
                        backgroundColor: 'lightblue' // Change this to the desired background color
                    });
                    // Refetch the events to display the updated date range
                    calendar.refetchEvents();
                }
                // Event handler for the 24 hours button
                document.getElementById('set24Hours').addEventListener('click', function () {
                    var endDate = calculateEndDate(1); // 1 day (24 hours)
                    calendar.select(startDate, endDate);
                    updateCalendarDateRange();
                });

                // Event handler for the 7 days button
                document.getElementById('set7Days').addEventListener('click', function () {
                    var endDate = calculateEndDate(7); // 7 days
                    calendar.select(startDate, endDate);
                    updateCalendarDateRange();
                });

                // Event handler for the 30 days button
                document.getElementById('set30Days').addEventListener('click', function () {
                    var endDate = calculateEndDate(30); // 30 days
                    calendar.select(startDate, endDate);
                    updateCalendarDateRange();
                });

                // Event handler for selecting a new start date in the calendar
                calendar.on('select', function (info) {
                    updateCalendarDateRange();
                });
            }}
            );

            // Show the calendar modal when the button is clicked
            $('#calendarModal').on('shown.bs.modal', function () {
                calendar.render();
            });
        });
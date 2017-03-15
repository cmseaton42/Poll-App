var slug = window.location.pathname.split('/');
var URL = '/api/polls/' + slug[slug.length - 1];

var ColorArray = [
    'rgba(244, 110, 110, .85)',
    'rgba(110, 116, 244, .85)',
    'rgba(118, 244, 110, .85)',
    'rgba(110, 241, 244, .85)',
    'rgba(233, 110, 244, .85)',
    'rgba(244, 244, 110, .85)'
]


$(function () {
    $.getJSON(URL, function (poll) {
        var data = [];
        var sum = 0;

        for (var j = 0; j < poll.options.length; j++) {
            data.push({
                value: poll.options[j].count,
                color: ColorArray[j % ColorArray.length],
                label: poll.options[j].text
            });

            sum += poll.options[j].count;
        }

        if (sum === 0) {
            data = [{
                value: 1,
                color: 'rgba(212, 212, 212, 1)',
                label: 'No Votes Casted'
            }];
        }

        var ctx = document.getElementById(poll.url).getContext('2d');
        var options = {
            segmentShowStroke: false,
            animateScale: true
        }

        new Chart(ctx).Doughnut(data, options);
    });
});

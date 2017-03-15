var ColorArray = [
    'rgba(244, 110, 110, .85)',
    'rgba(110, 116, 244, .85)',
    'rgba(118, 244, 110, .85)',
    'rgba(110, 241, 244, .85)',
    'rgba(233, 110, 244, .85)',
    'rgba(244, 244, 110, .85)'
]


$(function () {
    $.getJSON(URL, function (polls) {
        var innerHtml = '';
        if (polls.length !== 0) {
            for (var i = 0; i < polls.length; i++) {
                var data = [];
                var sum = 0;

                for (var j = 0; j < polls[i].options.length; j++) {
                    data.push({
                        value: polls[i].options[j].count,
                        color: ColorArray[j % ColorArray.length],
                        label: polls[i].options[j].text
                    });

                    sum += polls[i].options[j].count;
                }

                if(sum === 0) {
                    data = [{
                        value: 1,
                        color: 'rgba(212, 212, 212, 1)',
                        label: 'No Votes Casted'
                    }];
                }

                var ctx = document.getElementById(polls[i].url).getContext('2d');
                var options = {
                    segmentShowStroke: false,
                    animateScale: true
                }

                new Chart(ctx).Doughnut(data, options);
            }
        }
    });
});

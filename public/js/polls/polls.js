//var URL = window.location.protocol + '//' + window.location.hostname + '/api/polls';
var URL = '/api/polls';

$(function () {
    $.getJSON(URL, function (polls) {
        var innerHtml = '';
        if (polls.length === 0) {
            innerHtml = '<div className="alert alert-info" style="margin-top: 30px">' +
                '#[strong Oh Nooo!] No Polls Exist Yet, You Should Make One!!! =]' +
                '</div>';
        } else {
            //innerHtml = '<div className="row justify-content-center">';
            for (var i = 0; i < polls.length; i++) {
                innerHtml += buildPoll(polls[i]);
            }
            //innerHtml += '</div>'
        }



        var html = '<div class="container-fluid justify-content-around">' +
            '<div class="row justify-content-center">' +
            innerHtml +
            '</div>' +
            '</div>';

        $('#root').html(html);
    });
});

function buildPoll(poll) {
    return '<div class="col-sm-6 col-md-4 col-lg-3">' +
        '<div class="card">' +
        '<div class="card-block">' +
        '<h3 class="card-title">' + poll.title + '</h3>' +
        '<div class="chart-container">' + 
        '<canvas id="' + poll.url + '"></canvas>' +
        '</div><hr>' +
        '<a class="btn btn-outline-primary" href="/polls/' + poll.url + '">View</a>' +
        '</div>' +
        '</div>' +
        '</div>';

}
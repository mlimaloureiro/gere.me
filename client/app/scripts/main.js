/*global gereMe, $*/

var serverURL = 'http://localhost:8000/api/v1';

window.gereMe = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},

    init: function () {
        'use strict';
        console.log('Starting gere.me!');

        _.bindAll(this, 'changeDate');
        var that = this;

        this.receitasList = new gereMe.Collections.ReceitasCollection();
        this.clientesList = new gereMe.Collections.ClientesCollection();
        this.servicosList = new gereMe.Collections.ServicosCollection();
        this.despesasList = new gereMe.Collections.DespesasCollection();
        this.porReceberList = new gereMe.Collections.PorReceberCollection();


        /* to work with time intervals */
        this.currentTime = new Date();

        this.currentMonth = this.currentTime.getMonth() + 1;
        this.currentYear = this.currentTime.getFullYear();
        this.currentDay = this.currentTime.getDate();

        this.currentTimeString = this.currentYear + '-' + this.currentMonth + '-' + this.currentDay;

        this.prevMonthContainer = $("#gereMe_prevMonth");
        this.nextMonthContainer = $("#gereMe_nextMonth");
        this.currMonthContainer = $("#gereMe_currMonth");

        this.prevMonthContainer.on('click', function(evt) {
            that.changeDate(evt,'prev');
        });

        this.nextMonthContainer.on('click', function(evt) {
            that.changeDate(evt,'next');
        });

        this.prevMonthContainer.text(this.stringifyTime(this.currentMonth - 1));
        this.currMonthContainer.html(this.stringifyTime(this.currentMonth) + ', ' + this.currentYear );
        this.nextMonthContainer.text(this.stringifyTime(this.currentMonth + 1));


        this.servicosList.fetch();
        this.clientesList.fetch();
    },

    changeDate: function(evt, op) {

        evt.preventDefault();
        if(op === 'next') {
            this.currentMonth++;
            
            if(this.currentMonth == 13) { // avanca o ano
                this.currentMonth = 1
                this.currentYear++;
                console.log('YEAR CHANGED');
            } 
            
            this.prevMonthContainer.text(this.stringifyTime(this.currentMonth - 1));
            this.nextMonthContainer.text(this.stringifyTime(this.currentMonth + 1));

        } else {
            this.currentMonth--;

            if(this.currentMonth == 0) { // retrocede o ano
                this.currentMonth = 12
                this.currentYear--;
                console.log('YEAR CHANGED');
            } 
            
            this.nextMonthContainer.text(this.stringifyTime(this.currentMonth + 1));
            this.prevMonthContainer.text(this.stringifyTime(this.currentMonth - 1));
        
        }

        this.currMonthContainer.html(this.stringifyTime(this.currentMonth) + ', ' + this.currentYear );


        this.receitasList.fetch({reset:true});
        this.despesasList.fetch({reset:true});

    },

    stringifyTime: function(month) {
        var monthString = [this.currentYear - 1,'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',this.currentYear + 1];
        return monthString[month];
    }
};

$(document).ready(function () {
    'use strict';

    gereMe.init();

    new gereMe.Routers.RouteRouter();
    
    Backbone.history.start();
});

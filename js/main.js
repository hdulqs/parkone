
require(['jquery-1.11.0.min','bootstrap.min','3d'],
    function($,bootstrap) {

        new WOW().init();

        var myVue = new Vue({
               el: "#main",
               data:{
                   products: [
                       {name: 'ƻ��',price: 25,category: "ˮ��"},
                       {name: '�㽶',price: 15,category: "ˮ��"},
                       {name: 'ѩ��',price: 65,category: "ˮ��"},
                       {name: '����',price: 2500,category: "����"},
                       {name: '����',price: 10025,category: "����"},
                       {name: '����',price: 15,category: "ˮ��"},
                       {name: '�µ�',price: 25,category: "����"}
                   ],
                   show: true
               }
        })

});
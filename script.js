$(document).ready(function () { //Tüm site yüklendiğinde, javascript, html, image dosyaları hazır olduğunda çalışmaya başlıyacak.
    //<div class="item"><img index="0" class="picture" src="Pictures/apple.png" /></div>
    //json data

  //  $('#a'); document.getElementById('a');
    //$('.a_class'); document.getElementByClass('a_class');
   // $('input'); document.getElementByType('input');

    var asd = $.getJSON("hayvanoyunu.json", function (data) {

    })
      .done(function (data) {
          datamiz = data;
          var count = 0;
          //Küçük resimleri ekrana yerleştiriyor
          $.each(data, function (key, data2) {
              ItemGetir(data2.url, data2.ses, count);
              count += 1;
          });

          BeniBuyut();

          //Büyük resmi oluşturuyor + ses
          //BeniBuyut(data);



          $('.content .choice .item .picture').click(function (e) {
              var tiklanan = $(e.currentTarget).attr('src');
              var aktifolan = $('.center img').attr('src2');

              if (aktifolan == tiklanan) {
                  ScoreYaz(ScoreGoster() + 50);
                  //alert('Tebrikler 50 puan kazandınız');
                  //    aktifolan.ItemGetir('src2');
                  SonrakiHayvanYazisiniGoster("Sonraki Hayvanı seçiniz.");

                 // $('.center icerik').remove();
                  $('.center img').remove();
                  $('.ses audio').attr('src', '');
             
                  BeniBuyut();
              }
              else {
                  //alert('hatalı sonuç');
                  SonrakiHayvanYazisiniGoster("Yanlış Hayvan Seçtiniz!");

              }
          });

      })
      .fail(function () {
      })
      .always(function () {
      });
    asd.complete(function () {
    });

});

var list = [];
var datamiz;
var oyunbasladi = false;

function OyunuBaslat() {
    oyunbasladi = true;
    list = [];
    BeniBuyut();
}

function BeniBuyut() {
    $('.center img').remove();
    var random = getRandomInt(1, $('.choice .item').length);
    if (list.length == $('.choice .item').length) { //Tüm resimler gösterildi oyun başllıyor yada tüm resimler doğru bilindi
        if (oyunbasladi) {
            alert('oyunu bitirdiniz !');
            return;
        }
        OyunuBaslat();
        return;
    }
    else if ($.inArray(random, list) > -1) {
        BeniBuyut(); //Daha önce gösterilen bir resim seçildi yeni seçim yapılacak
        return;
    }
    var count = 0;
    $.each(datamiz, function (key, data2) {
        if (count + 1 == random) {  //Seçilen resim gösteriliyor
            if (oyunbasladi) {
                ItemBuyut("Pictures/questionmark.png", data2.ses, count, data2.url);
            }
            else {
                ItemBuyut(data2.url, data2.ses, count);
            }
            list.push(random);
        }
        count += 1;
    });
    if (!oyunbasladi)
        setTimeout(BeniBuyut, 1000);

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ItemBuyut(resimurl, ses, index, src2) {
    var img = $('<img/>').addClass('picture').attr('index', index);
    $(img).attr('src', resimurl).attr('class', 'buyut').attr('src2', src2);
    $('.center').append(img);
    $('.ses audio').attr('src', ses);
    kucultbuyut();
}

var kuculdu = false;

function kucultbuyut() {
    if (kuculdu) {
        kuculdu = false;
        //$('.center img').removeClass('buyut');
        //$('.center img').addClass('kucult');
        $('.center img').fadeIn('slow');
    }
    else {
        kuculdu = true;
        $('.center img').fadeOut('slow');
        //$('.center img').removeClass('kucult');
        //$('.center img').addClass('buyut');

    }
    setTimeout(kucultbuyut, 1000);

}

function ItemGetir(resimurl, ses, index) {
    var div = $('<div/>').addClass('item');
    var img = $('<img/>').addClass('picture').attr('index', index);
    $(img).attr('src', resimurl)
    $(img).attr('ses', ses)
    $(div).append(img);
    $('.choice').append(div);
}

function ScoreGoster() {
    return parseInt($('.score').text());
}

function ScoreYaz(score) {
    $('.score').text(score);

}
function SonrakiHayvanYazisiniGoster(kontrol) {
    return $('.icerik').text(kontrol);
}




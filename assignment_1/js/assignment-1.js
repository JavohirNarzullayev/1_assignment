const API_PHOTO = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=950888e0219426f8682b3027344570f0&format=json&nojsoncallback=1'
const GetInfo_Api = "https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=002c5d4f43158b98602dde76c8fe6766&format=json&nojsoncallback=1"
var ph_id = [];
var title = [];
var discription = '';
var link = [];
let morpage = "6";
var time = [];
var realname = '';
function start() {
  $.getJSON(API_PHOTO,
    {
      tags: tagText,//Bu yerda api ni ko`rsatyapmiz yani qaysi server saytidan malumotni olish va to`gridan to`g`ri j
      tag_mode: "any",
      per_page: morpage,//rasmlar chiqqandagi soni
      pages: "1"//beti
    }).done(function (data) {
      $("#region").empty();//region id ichiidalarni bo`shatayapman
      $("#card_region").empty();//card_region id ichidlargilarni bo`shatayapman   
      $("#btnTop").prop("disabled", true);//propertyga disabled ni yoqyapman 
      $("#btnCenter").prop("disabled", true);
      $("#plus").css("visibility", "visible")//plus belgisini ko`rinadigan qilyapaman

      var picture = data.photos.photo;//picture ga photo ni elemtentalrni yuklayapman 
      var block = "";//blockni bo`shatyapman

      for (i in picture) {
        var img = picture[i];
        title[i] = img.title//titileni oliyapman
        link[i] = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;//rasm linkini olyapman
        block += `<div class="card" style="width:400px" id="card_region">     
         <img class="card-img-top tooltiptext"  onmouseenter=getInfo(${i}) src="${link[i]}" alt="Card image" style="width:100%"><div class="tooltip">
         <span class="tooltiptext"><p><span>${title}<span></p></span></div><div class="card-body" id="card_photo">
         <h4 class="card-title" id=""><p><span>${title}<span></p></h4>
         <a href="" class="btn btn-primary"data-toggle="modal" data-target="#myModal" id=${i} onclick='modal(${i})' >Information</a>
         </div>
        </div>`;//rasmini elemtentlarni blockga qo`shyapaman


        $("#card_region").append(block);//card regionni ichiga blockni quyyapman
        ph_id[i] = img.id;//har bir rasm id isi bo`yicha massivga yuklayapman
        block = " "//blockni yana bo`shatdim
        $("#btnTop").removeAttr("disabled")//disabled atributni olib tashladim
        $("#btnCenter").prop("disabled");

      }
    }).fail(function (status) {//bu bo`limda xatliklar ustida ishlayapaman
      if (status != 200) return false;
      alert("Not found"); return;
    });
};



function find(choose) {//ikkita qidiruv oynasi uchun
  $("#btnTop").prop("disabled", true);
  $("#btnCenter").prop("disabled", true);

  if (choose == 0) {
    tagText = tag_valid($("#inputTop").val().toLowerCase());
  } else {
    tagText = tag_valid($("#inputCenter").val().toLowerCase());
  }


  start();//va sungra api olyapaman
  $("#btnTop").removeAttr("disabled");
  $("#btnCenter").removeAttr("disabled");
}

function tag_valid(tag) {//taglarni ustida ishlash uchun

  if (tag == "") alert("Sorry you do not write in box");
  else return tag;
}


function getInfo(y) {//rasmi ustiga olib borganda info chiqishi uchun
  $.getJSON(
    GetInfo_Api, {
    photo_id: ph_id[y]
  }
  ).done(function (data) {
    realname = data.photo.owner.realname;
    discription = data.photo.title._content
    time = data.photo.dates.taken;
    $("#" + y).attr("title", realname);
    console.log(realname)
  })
}

function modal(m) {
  $("#modal_title").text(realname);
  $("#modal_body").text(discription);
  $("#modal_image").attr("src", link[m]).css("width","460px");
  $("#modal_footer").text(time);
  start();
}
function more() {
  for (i in morpage) {
    morpage = morpage * 2 * (i + 1);
    start();
  }
}























































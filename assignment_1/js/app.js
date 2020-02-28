var curPage = 1, pages=1;
var tagText = "";

function load(){
    var url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=950888e0219426f8682b3027344570f0&format=json&nojsoncallback=1";
    
    $.getJSON( url, {
        tags: tagText,
        tagmode: "any",
        per_page: "18",
        page: curPage
    }).done(function(data){
        $("#grid").empty();
        pages = data.pages;
        var arr = data.photos.photo;
        var row = "";
        for (i in arr) {
            var img= arr[i];
            var link = "https://farm"+img.farm+".staticflickr.com/"+img.server+"/"+img.id+"_"+img.secret+"_q.jpg";

            row += '<td><img src="'+link+'" onclick="detailed('+img.id+')"></td>';
            if (i % 6 == 5) 
                $("#grid").append("<tr>"+row+"</tr>");
                row = "";
               
        }

        if(row != '') $("#grid").append("<tr>"+row+"</tr>");

    }).fail(function(){
        alert("Failed");
    })
}

function search(inp){
    curPage = 1;
    $("#btnTop").prop("disabled", true);
    $("#btnCenter").prop("disabled", true);
    
    if(inp == 0) {
        tagText = $("#inputTop").val().toLowerCase();
    } else {
        tagText = $("#inputCenter").val().toLowerCase();
    }
    
    load();
    $("#btnCenter").removeAttr("disabled");
    $("#btnTop").removeAttr("disabled");
};

function nextPage(){
    if(curPage == pages) return;

    curPage++;
    load()
}

function prevPage(){

}

function detailed(id){
    var infoUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=950888e0219426f8682b3027344570f0&format=json&nojsoncallback=1";
    $.getJSON(infoUrl, {
        photo_id: id
    }).done(function(data){
        var info = data.photo;
        console.log(info);
    }).fail(function(){
        alert("Failed info");
    });
    
    $("#detail").animate({
        left: "0",
        width: "100%"
    });
    $("#btnBack").css("display", "initial");
};

function nextImage(){

}       

function prevImage(){

}

function back(){
    $("#detail").animate({
        left: "100vw",
        width: "0",
    });

    $("#btnBack").css("display", "none");
};
var urlsmall = "http://augur.osshealth.io:5000/api/unstable/repo-groups/24/repos/21625/pull-requests-merge-contributor-new";
var url = "http://augur.osshealth.io:5000/api/unstable/repos";            
var Contributors;

$(document).ready(function(){
    $("#button1").hide();
    $(".row").hide();
    $.getJSON(url, function(result){
        console.dir(result);
        Contributors = result;
        $(".loader").hide();
        $("#button1").show();
    });

    $("#button1").click(function(){
        $(".row").show();
        var repo = [];
        var count = [];
        var combined = [];
        for(var i = 0, len = Contributors.length; i < len; i++){
            if(repo.includes(Contributors[i].repo_group_id)){
                count[repo.indexOf(Contributors[i].repo_group_id)] += 1;
            }
            else{
                repo.push(Contributors[i].repo_group_id);
                count.push(1);
            }  
        }
        for(var i = 0, len = repo.length; i < len; i++){
            var group = {id: repo[i], count: count[i]};
            combined.push(group); 
        }
//            console.dir(combined);
    displayTable(combined);    
    });
});

function displayTable(combined){    
//    console.dir(combined);
    var container = document.getElementById("bar-horzontal");
    var leftcolumn = document.getElementById("column1");
    for(var i = 0, len = combined.length; i < len; i++){
        var bar = document.createElement("div");
        var list = document.createElement("div");
        var text = document.createElement("p");
//        text.innerHTML = 
        bar.innerHTML = combined[i].count;
        list.innerHTML = "Repo: " + combined[i].id;
        //this sets the color of the boxes and the width
        bar.style = "background: " + randDarkColor() + "; width: " + ((combined[i].count/20)+2) + "%;";
//        list.append(text);
        leftcolumn.appendChild(list);
        
        container.appendChild(bar);
    }   
}
    
function randDarkColor() {
    //console.log(Contributors);
  var lum = -0.25;
  var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}
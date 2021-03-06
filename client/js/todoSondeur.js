var formulaire_Appel = affiche_HTML("formulaire_Appel.html");
var formulaire_infoQuest = affiche_HTML("formulaire_infoQuest.html");
var formulaire_infoSonde = affiche_HTML("formulaire_infoSonde.html");
var reponse_questions_sonde = affiche_HTML("reponse_questions_sonde.html");
var choixlibre_sonde=affiche_HTML('choixlibre_sonde.html');
var choixmultiple_sonde=affiche_HTML('choixmultiple_sonde.html');
var choixunique_sonde=affiche_HTML('choixunique_sonde.html');


var questionnaireCourant;
var sondeCourant;
var num;
var numQ;
var tabQ;
var maMap;
var numMax;
var idcaracCourant;

var dicoReponses;
// Début fonction récup HTML en string *******************************************************************************
function affiche_HTML(fichierHTML)
{
     var result = null;
     $.ajax({
        url: fichierHTML,
        type: 'get',
        dataType: 'html',
				data:'',
        async: false,
        success: function(data) {
            result = data;

        }
     });
     return result;
}

//Fin fonction récup HTML en string *******************************************************************************


function accueilSondeur(){

  $("#main").empty();
  $("#main").append('<div id="sondeInfo" class="col-md-6"/>');
  $("#sondeInfo").append($(formulaire_infoSonde).html());

  $("#main").append('<div id="questInfo" class="col-md-6"/>');
  $("#questInfo").append($(formulaire_infoQuest).html());


  $("#main").append($(formulaire_Appel).html());

  questionnaireCourant=trouverQuestionnaireCourant();
  trouverSondeCourant();


  remplirInfosFormulaireQuestionnaire(questionnaireCourant);
  remplirInfosFormulaireSonde(sondeCourant);
}


function retourSondeur(){

  $("#main").empty();
  $("#main").append('<div id="sondeInfo" class="col-md-6"/>');
  $("#sondeInfo").append($(formulaire_infoSonde).html());

  $("#main").append('<div id="questInfo" class="col-md-6"/>');
  $("#questInfo").append($(formulaire_infoQuest).html());


  $("#main").append($(formulaire_Appel).html());


  remplirInfosFormulaireQuestionnaire(questionnaireCourant);
  remplirInfosFormulaireSonde(sondeCourant);
}
function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}

function afficheReponseQuestionSonde(){
  maMap = new Map();
  dicoReponses = new Map();
$("#main").empty();
$("#main").append($(reponse_questions_sonde).html());
remplirInfoQuestionnaireDetails(questionnaireCourant);
afficheLesQuestions(questionnaireCourant);



}

function exec(){
  sleep(1);
  tabQ=new Array();
  numQ=-1;
for(var question of maMap.keys()){

  for(var i=0;i<maMap.get(question).length;i++){
    $("#propQCM"+question).empty();
    tabQ.push(question);
   setReponsesCHoixMultiple(maMap.get(question)[i]);

  }
 }

}
function ajoutJSONformulaire(data){
    //console.log(JSON.stringify(data));
  //  $(#titreForm).empty();
    $("#titreForm").text("Formulaire n° "+data["data"]["id"]);
    $("#titre").text(data["data"]["titre"]);
    setNomPanel(data["data"]["panel"]);
    setNomClient(data["data"]["client"]);

}


function setNomPanelJSON(data){
       $("#titrepan").text(data["data"]["intitule"]);
}



function setNomClientJSON(data){
  $("#titrecli").text(data["data"]["raison"])
}

function ajoutJSONsonde(data){


    $("#numTel").text("Téléphone : "+data["data"]["telephone"]);
    $("#titreformSonde").text("Sondé n° "+data["data"]["id"]);
    $("#nomsond").val(data["data"]["nom"]);
    $("#prenomsond").val(data["data"]["prenom"]);
    $("#datesond").val(data["data"]["date_naissance"]);
}


function trouverQuestionnaireCourant(){

  return "1";
}

function trouverSondeCourant(){
  sondeCourant = getRandomInt(0,1000).toString();
  affecteridcaraccourant(sondeCourant);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function ajoutJSONQuestDetail(data){
  $("#titrequestdet").text("Formulaire n° "+data["data"]["id"]);
  setNomConcepteur(data["data"]["concepteur"]);
  setNomClient(data["data"]["client"]);
  setNomSonde(sondeCourant);
}

function setNomConcepteurJSON(data){
  $("#createur").text(data["data"]["nom"]+" "+data["data"]["prenom"]);
}
function setNomSondeJSON(data){
  $("#sonde").text(data["data"]["nom"]+" "+data["data"]["prenom"]);}


function afficheJSONQuestion(data){
	var listeQuestion = data["data"]["questions"];
  numMax  = listeQuestion.length;
	for(var i=0;i<listeQuestion.length;++i){
		affiche_Question_Donnees_Sondeur(listeQuestion[i]);
	}

	$('#TitreFormulaire').text("Formulaire N°"+data["data"]["id"]);



}
function setNomQuestionJSON(data){
  $("#listeQuestions").append("<p>"+data["data"]["intitule"]+"</p>");
}


function annulationQuestion(){
  if (confirm("Voulez-vous vraiment annuler ?")) { // Clic sur OK
    retourSondeur();}
}


function affiche_Question_Affichage_Sondeur(data){

	 num = data["data"]["objects"][0]["numero"];


	switch(data["data"]["objects"][0]["id_type"]) {

	    case "u":

      //création et affichage de la question
      $("#listeQuestions").append($(choixmultiple_sonde).html());
      $("#choixmul").attr("id","typeQuestionnaire"+num);
      $("#propQCM").attr("id","propQCM"+num);
      var reponses = data["data"]["objects"][0]["reponses"];
      var tab=new Array();

      for( var i=0;i<reponses.length;++i){
        tab[i]=reponses[i];
      //  setReponsesCHoixMultiple(reponses[i]);
        }
              maMap.set(num,tab);
      break;

		case "l":
			$("#listeQuestions").append($(choixlibre_sonde).html());
			$("#choixlibre").attr("id","typeQuestionnaire"+num);
      $('#repUnique').attr("id","repUnique"+num);
      dicoReponses.set("repUnique"+num,0);
			break;

      case "n":
  			$("#listeQuestions").append($(choixlibre_sonde).html());
  			$("#choixlibre").attr("id","typeQuestionnaire"+num);
              $('#repUnique').attr("id","repUnique"+num);
        dicoReponses.set("repUnique"+num,0);
  			break;

		case "m":


			//création et affichage de la question
			$("#listeQuestions").append($(choixmultiple_sonde).html());
			$("#choixmul").attr("id","typeQuestionnaire"+num);
      $("#propQCM").attr("id","propQCM"+num);



			var reponses = data["data"]["objects"][0]["reponses"];

      var tab=new Array();

      for( var i=0;i<reponses.length;++i){
        tab[i]=reponses[i];
      //  setReponsesCHoixMultiple(reponses[i]);
        }
              maMap.set(num,tab);
			break;
	}
	try{
		$("#legendeQuestion").attr("id","legendeQuestion"+num);
		$("#question").attr("id","question"+num);
		//changement des noms des Ids  ******************************************************
		// change le numéro de la question

	$("#legendeQuestion"+num).text("Question "+num);
		//remplit la question
		$("#question"+num).text(data["data"]["objects"][0]["intitule"]);
		//désactive la question

        if(num==numMax)$("#boutoncode2").click();



	}
	catch(err)
	{
		console.log("Pas de questions")
	}


}


function affiche_reponses_QCM(data){


  numQ++;
  $("#propQCM"+tabQ[numQ]).append('<input type="checkbox" id="reponse'+tabQ[numQ]+data["data"]["objects"][0]["id"]+"c"+'" value="checkbox1"><span id="reponse'+tabQ[numQ]+data["data"]["objects"][0]["id"]+'"> '+data["data"]["objects"][0]["valeur"]+' </span><br/>');
      dicoReponses.set('reponse'+tabQ[numQ]+data["data"]["objects"][0]["id"],1);
}

function insertInfoSonde(){

  if (confirm("Voulez-vous vraiment modifier les infos du sondé ?")) { // Clic sur OK

  modif("/api/sonde/"+sondeCourant,JSON.stringify({
    "id":sondeCourant,
    "nom":$("#nomsond").val(),
    "prenom":$("#prenomsond").val(),
    "date_naissance":$("#datesond").val()
    }));
  }



}


function repondre(){
  if (confirm("Voulez-vous valider le questionnaire ? Ce choix est définitif !")) {

    var bo = true;

      for(var id of dicoReponses.keys()){

          if (dicoReponses.get(id) == 0){
              if($("#"+id).val() == " ") bo=false;

          }
       }



if(bo){
  for(var id of dicoReponses.keys()){

      if (dicoReponses.get(id) == 0){


        ajout("/api/repondre",JSON.stringify({
          "id_caracteristique":idcaracCourant,
          "id_questionnaire":questionnaireCourant,
          "qu_numero":id.charAt(9),
          "re_valeur":$("#"+id).val()
        }));


        console.log(JSON.stringify({
          "id_caracteristique":idcaracCourant,
          "id_questionnaire":questionnaireCourant,
          "qu_numero":id.charAt(9),
          "re_valeur":$("#"+id).val()
        }));


      }

      if (dicoReponses.get(id) == 1){
        if ($("#"+id+"c").is(':checked')){

        ajout("/api/repondre",JSON.stringify({
          "id_caracteristique":idcaracCourant,
          "id_questionnaire":questionnaireCourant,
          "qu_numero":id.charAt(8),
          "re_valeur":$("#"+id).text()
        }));

      console.log( JSON.stringify({
          "id_caracteristique":idcaracCourant,
          "id_questionnaire":questionnaireCourant,
          "qu_numero":id.charAt(7),
          "re_valeur":$("#"+id).text()
        }));
      }
      }





   }

  retourSondeur();}
  else alert("Veuillez remplir tout les champs");

}

}


function affecterJSONidcarac(data){
  idcaracCourant = data["data"]["id_caracteristique"];
}
//Debut fonction Roméo
//Fin fonction Roméo
//Debut fonction Léo
//Fin fonction Léo

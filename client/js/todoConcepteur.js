//création des variables html
var formulaire_Recherche_Sondage = affiche_HTML("formulaire_Recherche_Sondage.html");
var formulaire_Sondage_A_Remplir = affiche_HTML("formulaire_Sondage_A_Remplir.html");
var formulaire_Question_A_Remplir3 = affiche_HTML("formulaire_Question_A_Remplir3.html");
var formulaire_Question_A_Remplir2 = affiche_HTML("formulaire_Question_A_Remplir2.html");
var formulaire_Question_A_Remplir = affiche_HTML("formulaire_Question_A_Remplir.html");
var formulaire_Info_Sondage = affiche_HTML("formulaire_Info_Sondage.html");
var formulaire_Sondage_A_Remplir = affiche_HTML("formulaire_Sondage_A_Remplir.html");

// Variables pour créerquestionnaire dans la base

var idCli, idPan, idC;

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

//Début fonction affichage des différentes DIVS

function accueilConcepteur(){
	$("#main").empty();
	$("#main").append('<input type="button" value="Créer un nouveau sondage" class="btn btn-primary btn-lg active top-10 col-md-offset-3 col-md-6 bot-10" onclick="creerFormulaire()">');
  $("#main").append($(formulaire_Recherche_Sondage).html());
	// CECI EST POUR LEXEMPLE, à EDITER PAR LA SUITE AVEC UNE RECHERCHE DANS LA BASE
	for(var i =0;i<4;i++){
  	$("#main").append($(formulaire_Info_Sondage).html());
  }
  remplissageFormQuestRecherche();
}

function creerFormulaire(){
	$("#main").empty();
  $("#main").append($(formulaire_Sondage_A_Remplir).html());
	$("#main").append($(formulaire_Question_A_Remplir).html());
  $("#main").append($(formulaire_Question_A_Remplir3).html());
  $("#main").append($(formulaire_Question_A_Remplir2).html());
	$("#typeQuestionnaire").empty();
  $("#typeQuestionnaire2").empty();
  $("#typeQuestionnaire3").empty();
  remplissageFormQuest();
  recupId();
}

function choisirTypeQuestion(type){

	if(type.value=="choixM"){
		$("#typeQuestionnaire2").empty();
	    $("#typeQuestionnaire3").empty();
	    $("#typeQuestionnaire").replaceWith($(formulaire_Question_A_Remplir).html());
	  }

	if(type.value=="yesOrNo"){
	  $("#typeQuestionnaire").empty();
	  $("#typeQuestionnaire2").empty();
	  $("#typeQuestionnaire3").replaceWith($(formulaire_Question_A_Remplir3).html());
	}

	if(type.value=="reponseLibre"){
	  $("#typeQuestionnaire").empty();
	  $("#typeQuestionnaire3").empty();
	  $("#typeQuestionnaire2").replaceWith($(formulaire_Question_A_Remplir2).html());
  	}

}


// Pour les questions avec une choix multiple
function ajoutReponse(){
  $('#checkboxReponses').append('<div class="row" id="row">\n<input type="checkbox" id="checkboxreponse" value="reponse"/>\n<input type="text" id="reponse" placeholder="Entrer une réponse"/>\n</div>');
}

function supprReponse(){
  $('#row').last().remove();
}

//Debut fonction Jérémie
//Fin fonction Jérémie

// --------------------------------------- Debut fonction Olivier ---------------------------------------
function ajouteClient(client){
  for(var i=0; i<client["data"]["num_results"]; i++){
    $('#listeClient').append('<option value="'+client['data']['objects'][i]['raison']+'">'+client['data']['objects'][i]['raison']+'</option>');
  }
}

function ajouteUtilisateur(utilisateur){
  for(var i=0; i<utilisateur["data"]["num_results"]; i++){
    $('#choixConcepteur').append('<option value="'+utilisateur['data']['objects'][i]['nom']+'">'+utilisateur['data']['objects'][i]['nom']+'</option>');
  }
}

function ajoutePanel(panel){
  for(var i=0; i<panel["data"]["num_results"]; i++){
    $('#choixPanel').append('<option value="'+panel['data']['objects'][i]['intitule']+'">'+panel['data']['objects'][i]['intitule']+'</option>');
  }
}

function ajouteClientRecherche(client){
  for(var i=0; i<client["data"]["num_results"]; i++){
    $('#listeEntreprise').append('<option value="'+client['data']['objects'][i]['raison']+'">'+client['data']['objects'][i]['raison']+'</option>');
  }
}

function ajouteUtilisateurRecherche(utilisateur){
  for(var i=0; i<utilisateur["data"]["num_results"]; i++){
    $('#listeConcepteur').append('<option value="'+utilisateur['data']['objects'][i]['nom']+'">'+utilisateur['data']['objects'][i]['nom']+'</option>');
  }
}

function ajoutePanelRecherche(panel){
  for(var i=0; i<panel["data"]["num_results"]; i++){
    $('#listePanel').append('<option value="'+panel['data']['objects'][i]['intitule']+'">'+panel['data']['objects'][i]['intitule']+'</option>');
  }
}

function recupIdClient(clients){
  var client=$('#listeClient').val();
  for(var i=0; i<clients["data"]["num_results"]; i++){
    if (client==clients['data']['objects'][i]['raison']){
      idCli=clients['data']['objects'][i]["id"];
    }
  }
}

function recupIdConcepteur(utilisateur){
  var concepteur=$('#choixConcepteur').val();
  for(var i=0; i<utilisateur["data"]["num_results"]; i++){
    if (concepteur==utilisateur['data']['objects'][i]['nom']){
      idC=utilisateur['data']['objects'][i]["id"];
    }
  }
}

function recupIdPanel(panel){
  var pan=$('#choixPanel').val();
  for(var i=0; i<panel["data"]["num_results"]; i++){
    if (pan==panel['data']['objects'][i]['intitule']){
      idPan=panel['data']['objects'][i]["id"];
    }
  }
}

function ajoutFormulaire(){
  var str={
    "etat": "C",
    "id_client": idCli,
    "id_concepteur": idC,
    "id_panel": idPan,
    "titre": "nouveau Q"
  }
  // var str='"client": "/api/client/'+idCli+'", "etat": "C", ';
  // str=str+'"concepteur": "/api/utilisateur/'+idC+'", "id_client": '+idCli+', "id_concepteur": '+idC+', ';
  // str=str+'"id_panel": '+idPan+', "panel": "/api/panel/'+idPan+'", "titre": "nouveau Q"';
  return str;
}
// --------------------------------------- Fin fonction Olivier ---------------------------------------
//Debut fonction Julien

function affiche_Question_Affichage(data){
	console.log(JSON.stringify(data));
	console.log(data["data"]["id_type"]);
	console.log(data["data"]["numero"]);

	var num = data["data"]["numero"];

	switch(data["data"]["id_type"]) {

	    case "u":
			$("#main").append($(formulaire_Question_A_Remplir3).html());
			$("#typeQuestionnaire3").attr("id","typeQuestionnaire"+num);
	        break;

		case "l":
			$("#main").append($(formulaire_Question_A_Remplir2).html());
			$("#typeQuestionnaire2").attr("id","typeQuestionnaire"+num);
			break;

		case "m":

			//création et affichage de la question
			$("#main").append($(formulaire_Question_A_Remplir).html());
			$("#typeQuestionnaire").attr("id","typeQuestionnaire"+num);


			console.log("C'est un type Note");
			var reponses = data["data"]["reponses"];

			//juste pour test
			// reponses[0]="cool";
			// reponses[1]="Pas top";
			// reponses[2]="NULLLLLLLLL";
			//juste pour test

			// affiche les réponses dans les input avec désactivation
			for(var i=0;i<reponses.length;++i){
				$("#reponse"+i).val(reponses[i]);
				$("#reponse"+i).prop('disabled', true);
			}
			break;
	}
	try{
		$("#legendeQuestion").attr("id","legendeQuestion"+num);
		$("#question").attr("id","question"+num);
		$("#boutonValider").attr("id","boutonValider"+num);
		$("#boutonAnnuler").attr("id","boutonAnnuler"+num);
		$("#choixTypeQuestion").attr("id","choixTypeQuestion"+num);

		//changement des noms des Ids  ******************************************************
		// change le numéro de la question

		$("#legendeQuestion"+num).text("Question "+num);
		//remplit la question
		$("#question"+num).val(data["data"]["intitule"]);
		//désactive la question
		$("#question"+num).prop('disabled', true);
		//change le boutton en edit avec sa fonction du onclick
		$("#boutonValider"+num).attr("value","Edit");
		$("#boutonValider"+num).attr("onclick","editQuestion(id)");
		//change le boutton en suppr avec sa fonction du onclick
		$("#boutonAnnuler"+num).attr("value","Suppr");
		$("#boutonAnnuler"+num).attr("onclick","suppressionQuestion(num)");
		//cache les bouttons
		$("#boutonAjoutReponse").hide();
		$("#boutonSupprimerReponse").hide();
		$("#choixTypeQuestion"+num).hide();
	}
	catch(err)
	{
		console.log("Pas de questions")
	}


}

function modifierSondageAffichage(data){
	console.log(JSON.stringify(data));
	console.log(data["data"]["questions"]);
	console.log(data["data"]["id"]);

	$("#typeQuestionnaire2").remove();
	$("#typeQuestionnaire3").remove();
	$("#typeQuestionnaire").remove();

	var listeQuestion = data["data"]["questions"];
	for(var i=0;i<listeQuestion.length;++i){
		console.log(listeQuestion[i]);
		affiche_Question_Donnees(listeQuestion[i]);
	}

	$('#TitreFormulaire').text("Formulaire N°"+data["data"]["id"]);
}

function editQuestion(id){
	console.log(id);
	var newId = id.charAt(13);
	console.log(newId);
	$("#question"+newId).prop('disabled', false);
	$("#boutonValider"+newId).attr("value","Valider");
	$("#boutonValider"+newId).attr("onclick","Envoi(data)");
	$("#boutonAnnuler"+newId).attr("value","Annuler");
	$("#boutonAnnuler"+newId).attr("onclick","Annule(data)");
}

function supprQuestion(id){
	console.log(id);
	var newId = id.charAt(13);
	console.log(newId);


}

//Fin fonction Julien

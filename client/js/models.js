var urlBase = "http://192.168.13.162:5000";

//La fonction principale
function connect(adresse,fonc){
    var rep = null;
      $.ajax({
         url: "http://192.168.13.162:5000"+adresse,
         type: "GET",
         // This is the important part
         xhrFields: {
             withCredentials: true
         },
         // This is the important part
         crossDomain: true,
         dataType: 'jsonp',
         success: fonc,
         error: function (xhr, status) {
             console.log("Erreur de connexion");
         }
      });

}



function Sonde(nom){
    this.nom=nom;
}



function modif(adresse,data){
    $.ajax({
        url:urlBase+adresse,
        type:'PUT',
        data:data,
        //JSON.stringify({"id":1,"nom":"MABITE"})
        contentType: "application/json",
        success: function (msg) {
            console.log('Update Success');
        },
        error: function (err){
            console.log('Update Error');
        }
        });

}

function ajout(adresse,data){
    $.ajax({
        url:urlBase+adresse,
        type:'POST',
        data:data,
        //JSON.stringify({"id":1,"nom":"MABITE"})
        contentType: "application/json",
        success: function (msg) {
            console.log('Insert Success');
        },
        error: function (err){
            console.log('Insert Error');
        }
        });

}

// Début fonction Léo
function remplirInfosFormulaireQuestionnaire(idFormulaire){
  connect("/api/questionnaire/"+idFormulaire,ajoutJSONformulaire);
}
function setNomPanel(lienPanel){
    connect(lienPanel,setNomPanelJSON);
}
function setNomClient(lienClient){
  connect(lienClient,setNomClientJSON);
}
function setNomConcepteur(lienConcept){
  connect(lienConcept,setNomConcepteurJSON);
}
function remplirInfosFormulaireSonde(idSonde){
  connect("/api/sonde/"+idSonde,ajoutJSONsonde);
}
function remplirInfoQuestionnaireDetails(idFormulaire){
  connect("/api/questionnaire/"+idFormulaire,ajoutJSONQuestDetail);
}
function setNomSonde(idSonde){
  connect("/api/sonde/"+idSonde,setNomSondeJSON);
}
function afficheLesQuestions(idFormulaire){
    connect("/api/questionnaire/"+idFormulaire,afficheJSONQuestion);
}

function setNomQuestion(lienQuest){
  connect(lienQuest,setNomQuestionJSON);
}

function modifSonde(idSond){
  data =
  modif(adresse,data)
}

function affiche_Question_Donnees_Sondeur(urlQuestion){
	connect(urlQuestion,affiche_Question_Affichage_Sondeur);
}


// Fin fonction Léo

//Debut fonction Roméo
//Fin fonction Roméo
//Debut fonction Jérémie
//Fin fonction Jérémie
//Debut fonction Olivier


function remplissageFormQuest(){
  connect("/api/client",ajouteClient);
  connect("/api/utilisateur",ajouteUtilisateur);
  connect("/api/panel",ajoutePanel);
}

function remplissageFormQuestRecherche(){
  connect("/api/client",ajouteClientRecherche);
  connect("/api/utilisateur",ajouteUtilisateurRecherche);
  connect("/api/panel",ajoutePanelRecherche);
}


function recupId(){
  connect("/api/client",recupIdClient);
  connect("/api/utilisateur",recupIdConcepteur);
  connect("/api/panel",recupIdPanel);
}

function AjouteFormBase(){
  var str=ajoutFormulaire();
  ajout("/api/questionnaire",JSON.stringify(str));
  $("#typeQuestionnaire").replaceWith($(formulaire_Question_A_Remplir).html());
}
//Fin fonction Olivier

//Debut fonction Julien
function affiche_client_par_sondage_donnees(url){
	connect(url,recup_client_par_sondage_Affichage);
}

function recup_concepteur_par_sondage_donnees(url){
	connect(url,recup_concepteur_par_sondage_Affichage);
}

function recup_panel_par_sondage_donnees(url){
	connect(url,recup_panel_par_sondage_Affichage);
}

function afficheSondageDonnees(){
	connect("/api/questionnaire",AfficheSondageAffichage);
}

function affiche_Tout_dans_sondage_donnees(){
	connect("/api/panel/3",affiche_Tout_dans_sondage_Affichage);
}

function modifSondageDonnees(idSondage){
	creerFormulaire();
	connect("/api/questionnaire/"+idSondage,modifierSondageAffichage);
}

function affiche_Question_Donnees(urlQuestion){
	connect(urlQuestion,affiche_Question_Affichage);
}

//Fin fonction Julien

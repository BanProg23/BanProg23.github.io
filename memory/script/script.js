//faux lorsque l'on a pas le droit de cliquer
aClick = false;
//faux tant qu'une partie n'est pas séléctionnée
var debutPartie = false;
$(document).ready(function(){
	
	//variables nécessaire au clic d'une carte
	var $carteTemp1;
	var $carteTemp2;
	var nbClick = 0;
	
	//au clique d'un des modes d'une partie (réinistialisation des cartes)
	$('button').click(function(){
		aClick = true;
		$('.jeu img').attr('src', 'images/carte_dos.png');
		$('.jeu img').removeAttr('disabled');
		debutPartie = true;
		$('#score').text(0);
		nbClick=0;
	});

	//au clic d'une partie normale (mélange des cartes)
	$('#np').click(function(){
		var i;
		var numberRand;
		var $tempID;
		for(i = 0; i<100; i++){
			numberRand = parseInt(Math.random()*20)+1;
			$tempID = $("#carte_"+numberRand).attr('id');
			$("#carte_"+numberRand).attr('id',$(".jeu img").first().attr('id'));
			$(".jeu img").first().attr('id', $tempID);
		}
	});
	
	//au clic d'une partie simple (réorganisation en mode partie simple des cartes)
	$('#ps').click(function(){
		var i = 1;
		var j = 0;
		$('img').each(function(){
			if(j%2==0)
			$(this).attr('id', 'carte_'+i);
			else{
				$(this).attr('id', 'carte_'+(i+10));
				i++;
			}
			j++;
		});
	});
	
	//au clic d'une carte, lancement des différentes options d'action
	$(".jeu img").click(function(){
	//si l'on a le droit de cliquer sur la carte
	if(aClick && $(this).attr('disabled')!='disabled'){
		//traitement sur la première carte cliquée
		if(nbClick == 0){
			nbClick++;
			$carteTemp1 = $(this);
			var number = $(this).attr('id').split('_')[1];
			if(number <= 10)
				$(this).attr("src", 'images/carte_first_'+number+'.png');
			else{
				var number = parseInt(number)-10;
				$(this).attr("src", 'images/carte_first_'+number+'.png');
			}
		}
		
		//traitement sur la deuxième carte cliquée
		else if(nbClick == 1 && $carteTemp1.attr('id')!=$(this).attr('id') ){
			$('#score').text(parseInt($('#score').text())+1);
			aClick = false;
			nbClick = 0;
			$carteTemp2 = $(this);
			var number = $(this).attr('id').split('_')[1];
			if(number <= 10)
				$(this).attr("src", 'images/'+$(this).attr('id')+'.png');
			else{
				var number = parseInt(number)-10;
				$(this).attr("src", 'images/carte_'+number+'.png');
			}
			var number1 = parseInt($carteTemp1.attr('id').split('_')[1]);
			var number2 = parseInt($(this).attr('id').split('_')[1]);
			if(number1 > 10)
				number1 = number1-10;
			if(number2 > 10)
				number2 = number2-10;
			
			//si les deux cartes séléctionnées ne sont pas identiques
			if(number1 != number2){
				$carteTemp1.attr('src', 'images/carte_'+number1+'.png');
				//laisse le temps à l'utilisateur de voir les cartes avant de les cacher
				setTimeout(function(){
					$carteTemp1.attr('src', 'images/carte_dos.png');
					$carteTemp2.attr('src', 'images/carte_dos.png');
					aClick = true;
				}, 1500);
			//si les cartes sont identiques
			} else {
				$carteTemp1.attr("src", 'images/carte_'+number1+'.png');
				$carteTemp1.attr('disabled', 'disabled');
				$carteTemp2.attr('disabled', 'disabled');
				var finPartie = true;
				//test si c'est la fin de la partie
				$('.jeu img').each(function(){
					if('images/carte_dos.png' == $(this).attr('src'))
						finPartie = false;
				});
				//prévient l'utilisateur que c'est la fin de la partie
				if (finPartie)
					alert('Félicitaion ! YOU WIN !!!');
				aClick = true;
			}			
		}
	}
	//prévient l'utilisateur qu'il faut choisir un mode de jeu
	if(!debutPartie){
		alert('Veuillez choisir un mode de jeu.');
	}
	});
});
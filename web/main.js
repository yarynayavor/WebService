var rootNode = document.getElementById("root");

fetch('/api/news/').then(function(response) {
	//console.log(response.json());
	return response.json();
}).then(function(news) {
	news.forEach(element => {
		var divNews=document.createElement("div");
		divNews.setAttribute("class", "news-block");
		//divNews.setAttribute("data-id", element._id);
		var h2Title=document.createElement("h2");
		h2Title.setAttribute("class", "news-title");
		h2Title.innerHTML=element.title;
		var update=document.createElement("a");
		update.setAttribute("href","#updateItem");
		update.innerHTML="Редагувати";
		update.setAttribute("data-id", element._id);
		update.setAttribute("data-title", element.title);
		update.setAttribute("onclick", `updateItem(this)`);

		var deleteEl=document.createElement("a");
		deleteEl.setAttribute("href","");
		deleteEl.setAttribute("class","delete");
		var id=element._id;
		deleteEl.setAttribute("onclick", `deleteItem(this)`);
	  deleteEl.setAttribute("data-id", element._id);
		deleteEl.innerHTML="Видалити";
		h2Title.appendChild(update);
		h2Title.appendChild(deleteEl);
		divNews.appendChild(h2Title);
		rootNode.appendChild(divNews);
	});
  })
  .catch(function(err){
	console.log(err);
});
	

function searchFunction() {
  var input, filter, h2;
  input = document.getElementById("searchInput");
	filter = input.value.toUpperCase();
	div = rootNode.getElementsByClassName("news-block");

  for (i = 0; i < div.length; i++) {
		h2 = div[i].getElementsByClassName("news-title")[0];
    if (h2) {
      if (h2.innerHTML.toUpperCase().indexOf(filter) > -1) {
       	div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    } 
  }
}

//add new
	var inputAddNew=document.getElementById('addN');
	var buttonAddNew=document.getElementById('add');
	buttonAddNew.addEventListener("click", function(){
		(async () => {
			const rawResponse = await fetch('http://localhost:4000/api/news/', {
    		method: 'POST',
    		headers: {
      		'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
    		 body: JSON.stringify({title:inputAddNew.value})
    	});
   		const content = await rawResponse.json();

			 console.log(content);
			
		})();
	});

	//delete item
	function deleteItem(element) {
		var id= element.getAttribute('data-id');
		var url = "http://localhost:4000/api/news";
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", url+'/'+id, true);
		xhr.onload = function () {
			var news = JSON.parse(xhr.responseText);
			if (xhr.readyState == 4 && xhr.status == "200") {
				console.log(news);
			} else {
				console.error(users);
			}
		}
		xhr.send(null);
	}

	//update item
	function updateItem(element) {
		var id= element.getAttribute('data-id');
		var title= element.getAttribute('data-title');
		var inputUpdate=document.getElementById('updateI');
		var buttonSave=document.getElementById('update');
		var div=document.getElementById('updateItem');
		div.style.display="block";
		inputUpdate.value=title;
		
  	buttonSave.addEventListener("click", function(){

		var url = "http://localhost:4000/api/news";

		var data = {};
		data.title = inputUpdate.value;
		var json = JSON.stringify(data);

		var xhr = new XMLHttpRequest();
		xhr.open("PUT", url+'/'+id, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = function () {
		var news = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
		console.log(news);
	} else {
		console.error(news);
	}
}
xhr.send(json);
});
}

//Send Email
// var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
// xmlhttp.open('POST', 'https://mandrillapp.com/api/1.0/messages/send.json');
// xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
// xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4) {
//         if(xmlhttp.status == 200) alert('Mail sended!')
//         else if(xmlhttp.status == 500) alert('Check apikey')
//         else alert('Request error');
//     }
// }
// xmlhttp.send(JSON.stringify({'key': 'cD7n-RFjFP3oGGZHe1WtWw',
//    'message': {
//        'from_email': 'theukrainiansmirror@gmail.com',
//        'to': [{'email': 'yourhurt09@gmail.com', 'type': 'to'}],
//        'autotext': 'true',
//        'subject': 'Yeah!',
//        'html': '<h1>Its work!</h1>'
//     }}));
// $.ajax({
// 	type: "POST",
// 	url: "https://mandrillapp.com/api/1.0/messages/send.json",
// 	data: {
// 		'key': 'a64o-9ehtHwrvN8cNIVEjw',
// 		'message': {
// 			'from_email': 'theukrainiansmirror@gmail.com',
// 			'to': [
// 					{
// 						'email': 'yourhurt09@gmail.com',
// 						'name': 'RECIPIENT NAME (OPTIONAL)',
// 						'type': 'to'
// 					}
// 				],
// 			'autotext': 'true',
// 			'subject': 'YOUR SUBJECT HERE!',
// 			'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
// 		}
// 	}
//  }).done(function(response) {
// 	 console.log(response); // if you're into that sorta thing
//  });

// var data = {
// 	service_id: 'gmail',
// 	template_id: 'template_zr8vh8Hz',
// 	user_id: 'user_xkebJNdimhZitWyXBl0ID',
// 	template_params: {
// 			'username': 'Yaryna'
// 	}
// };

// window.onload = function() {
// 	document.getElementById('contact-form').addEventListener('submit', function(event) {
// 			event.preventDefault();
// 			emailjs.sendForm('contact_service', 'contact_template', this);
// 	});
// }

// $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
// 	type: 'POST',
// 	data: JSON.stringify(data),
// 	contentType: 'application/json'
// }).done(function() {
// 	alert('Your mail is sent!');
// }).fail(function(error) {
// 	alert('Oops... ' + JSON.stringify(error));
// });
var rootNode = document.getElementById("root");

var request = new Request('http://localhost:4000/api/news', {
	method: 'GET',
	credentials: 'include',
	cache: 'no-cache',
	mode:'cors'
	});

fetch(request).then(function(response) {
	console.log(response.json());
	return response.json();
}).then(function(news) {
	news.forEach(element => {
		var divNews=document.createElement("div");
		divNews.setAttribute("class", "news-block");
		var h2Title=document.createElement("h2");
		h2Title.setAttribute("class", "news-title");
		h2Title.innerHTML=element.title;
		divNews.appendChild(h2Title);
		rootNode.appendChild(divNews);
	});
  })
  .catch(function(err){
	console.log(err);
  });
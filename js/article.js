function imageHTML(filename,credit,desc) {
	var staff = getStaff.byName(credit);
	return "<div class='img'><img src='storage/"+filename+"'><div class='row caption'><div class='col-xs-8 desc'>"+(desc !== null ? desc : "")+"</div><div class='col-xs-4 credit'>Image Credit: <a href='staff.php?"+staff._id.$oid+"'>"+staff.name.toUpperCase()+"</a></div></div></div>";
}

function articleHTML(article) {
	var $dom = $("<div>"+article+"</div>");
	console.log($dom.children("pic"))

	$dom.children("pic").each(function() {
    	$(this).replaceWith(imageHTML(
			$(this).attr("filename"),
			$(this).attr("credit"),
			$(this).attr("desc")
		));
	});

	return $dom.html();
}

function renderArticle(article) {
	document.title = article.title;

	$("#title").text(article.title);

	$("#author").html('<h4 id="author">by '+getStaffLink(article.staffs)+'</a>');

    var articleDate = new Date(article.date);
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var day = articleDate.getDate();
    var month = monthNames[articleDate.getMonth()];
    var year = articleDate.getFullYear();

    $("#date").text(month + " " + day + ", " + year);

	var paragraphs = article.content.split("\n");
	var contentString = "";

	paragraphs.forEach(function(paragraph) {
		contentString += "<p>" + articleHTML(paragraph) + "</p>";
	});

	$("#content").html(contentString);

	if (article.hasOwnProperty('imgID') && article.imgID != "") {
		var $img = $("#img");
		$img.css("background-image","url('/storage/" + article.imgID + "')");
		$img.css("background-size","100%");
		$img.css("background-position","50% 40%");
		$img.css("background-repeat","no-repeat");
		$img.css("width","100%");
		$img.css("height","300px");
		$img.css("margin-bottom","4px");

		$("#caption").html("Image Credit: " + getStaffLink(getStaff.byName(article.imgCredit)) + "</a>");
	}
}

$(document).ready(function() {
	var id = decodeURIComponent(window.location.href.split('?')[1]);
	getArticle.byID(id, renderArticle);
});

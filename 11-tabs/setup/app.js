// Select 
const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function(e){
    const name = e.target.dataset.name;
    if(name){
        // remove active from mother buttons
        btns.forEach(function(btn){
            btn.classList.remove("active");
            e.target.classList.add("active"); 
        });

        //hide other articles
        articles.forEach(function(article){
            article.classList.remove("active");
        });

        const element = document.getElementById(name);
        element.classList.add("active");

    }
});
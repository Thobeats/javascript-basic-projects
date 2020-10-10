let count = 0;

//select value and buttons

const value = document.getElementById("value");
const btns = document.querySelectorAll(".btn");

btns.forEach(function(btn) {
    btn.addEventListener("click", function(e){
        const styles = e.currentTarget.classList;

        if(styles.contains('decrease')){
            count--;
        } else if(styles.contains('increase')){
            count++;
        }else{
            count = 0;
        }

        count < 0 ? value.style.color = "#bc0af2" : count > 0 ? value.style.color = "#1865c4" : value.style.color = "#000";

        value.textContent = count;
    });
});
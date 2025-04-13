var nothing = document.querySelector('#nothing');
var main = document.querySelector('main');
var results = document.querySelector('.results');
var results_div = document.querySelector('.results div');
var removed = false;
function handleResize() {
    if (!main || !results) {
        console.error('main or results not found!');
        return;
    }
    if (window.innerWidth < 1127 && !removed) {
        if (nothing) {
            nothing.remove();
            removed = true;
        }
        main.style = "display: grid;grid-template-columns: 1.5fr;padding: 0 1rem;margin:0 auto;max-width: 1100px;margin-top: 1.5rem;";
        if (results) {
            results.style = "border-radius: 5px;display: grid;grid-template-columns: 1.5fr;padding: 0 1rem;margin:0 auto;max-width: 1100px;margin-top: 1rem;";
        }
        if (results_div) {
            results_div.style = "justify-self: left;align-self: center;font-size: 1.15rem;background-color: white;width: 100%; padding: 0 1rem;max-width: 1061px;border-radius: 5px;";
        }
    }
    else if (window.innerWidth >= 1127 && removed) {
        if (nothing) {
            main.appendChild(nothing);
            removed = false;
        }
        main.style = "display: grid;grid-template-columns: 1.1fr 0.4fr;gap:1.5rem;padding: 0 1rem;margin:0 auto;max-width: 1100px;margin-top: 1.5rem;";
        if (results) {
            results.style = "border-radius: 5px;display: grid;grid-template-columns: 1.1fr 0.4fr;padding: 0 1rem;margin:0 auto;max-width: 1100px;margin-top: 1rem;";
        }
        if (results_div) {
            results_div.style = "justify-self: left;align-self: center;font-size: 1.15rem;background-color: white;width: 100%; padding: 0 1rem;max-width: 767px;border-radius: 5px;";
        }
    }
}
window.addEventListener('resize', handleResize);
handleResize();

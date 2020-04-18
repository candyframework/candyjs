(function() {

var nav = document.getElementById('rightnav');
var width = nav.clientWidth;
var height = nav.clientHeight;
var winHeight = window.innerHeight;

nav.style.position = 'fixed';
nav.style.width = width + 'px';

if(height + 70 > winHeight) {
    window.addEventListener('scroll', () => {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if(top > 100) {
            nav.style.top = 'auto';
            nav.style.bottom = '10px';
        } else {
            nav.style.top = 'auto';
            nav.style.bottom = 'auto';
        }
    });
}

})();

function openNav1() {
    document.getElementById("mySidenav1").style.width = "300px";
    document.getElementById("map").style.marginLeft = "300px";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav3").style.width = "0";
    document.getElementById("mySidenav4").style.width = "0";
  }
  function openNav2() {
    document.getElementById("mySidenav2").style.width = "300px";
    document.getElementById("map").style.marginLeft = "300px";
    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav3").style.width = "0";
    document.getElementById("mySidenav4").style.width = "0";
  }
  function openNav3() {
    document.getElementById("mySidenav3").style.width = "300px";
    document.getElementById("map").style.marginLeft = "300px";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav4").style.width = "0";
  }
  function openNav4() {
    document.getElementById("mySidenav4").style.width = "300px";
    document.getElementById("map").style.marginLeft = "300px";
    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav3").style.width = "0";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav3").style.width = "0";
    document.getElementById("mySidenav4").style.width = "0";
    document.getElementById("map").style.marginLeft = "0";
  }


  
(function(){"use strict";
 var mq=function(){return window.innerWidth<=860;};

 /* ---- Mobile nav open/close ---- */
 var burger=document.querySelector(".burger"),menu=document.querySelector(".menu"),bd=document.querySelector(".nav-backdrop");
 function closeNav(){menu&&menu.classList.remove("open");bd&&bd.classList.remove("open");document.body.style.overflow="";}
 function openNav(){menu&&menu.classList.add("open");bd&&bd.classList.add("open");document.body.style.overflow="hidden";}
 burger&&burger.addEventListener("click",openNav);
 bd&&bd.addEventListener("click",closeNav);
 var mc=document.querySelector(".menu-close");mc&&mc.addEventListener("click",closeNav);

 /* ---- Mobile submenu accordion (one open at a time, smooth) ---- */
 document.querySelectorAll(".menu>li.has-drop>a").forEach(function(a){
   a.addEventListener("click",function(e){
     if(mq()){
       e.preventDefault();
       var li=a.parentElement, wasOpen=li.classList.contains("open");
       document.querySelectorAll(".menu>li.has-drop.open").forEach(function(o){ if(o!==li) o.classList.remove("open"); });
       li.classList.toggle("open", !wasOpen);
     }
   });
 });
 /* close nav only when a real link (not a submenu toggle) is tapped */
 menu&&menu.querySelectorAll("a").forEach(function(a){
   a.addEventListener("click",function(){
     if(a.parentElement.classList.contains("has-drop")&&mq())return;
     closeNav();
   });
 });

 /* ---- Hero split carousel (synced text + image) ---- */
 var hSlides=document.querySelectorAll(".hs-slide"),hImgs=document.querySelectorAll(".hs-img"),hDots=document.querySelectorAll(".hero-dots button");
 if(hSlides.length){
   var hi=0,htimer;
   function hgo(n){
     hSlides[hi].classList.remove("active");hImgs[hi]&&hImgs[hi].classList.remove("active");hDots[hi]&&hDots[hi].classList.remove("active");
     hi=(n+hSlides.length)%hSlides.length;
     hSlides[hi].classList.add("active");hImgs[hi]&&hImgs[hi].classList.add("active");hDots[hi]&&hDots[hi].classList.add("active");
   }
   function hauto(){htimer=setInterval(function(){hgo(hi+1);},6000);}
   hDots.forEach(function(d,k){d.addEventListener("click",function(){clearInterval(htimer);hgo(k);hauto();});});
   hauto();
 }

  function clearErrors(f){
    f.querySelectorAll(".field-error").forEach(function(e){e.remove();});
    f.querySelectorAll("input,select,textarea").forEach(function(e){e.style.borderColor="";});
    var st=f.querySelector(".form-status");if(st)st.textContent="";
  }
  function showError(el,msg){
    var p=el.closest(".field-group")||el.parentElement;
    var err=document.createElement("div");err.className="field-error";err.style.color="#d33";err.style.fontSize="0.85rem";err.style.marginTop="6px";err.style.fontWeight="600";
    err.textContent=msg; p.appendChild(err); el.style.borderColor="#d33";
  }

  /* ---- Enquiry / Site-visit modal ---- */
  var modal=document.getElementById("lead-modal");
  if(modal){
    var mBox=modal.querySelector(".modal-box"),
        mTitle=modal.querySelector(".modal-title"),
        mSub=modal.querySelector(".modal-sub"),
        mSubmit=modal.querySelector(".submit-label"),
        lForm=document.getElementById("lead-form");
    function openModal(mode){
      var visit=mode==="visit";
      mBox.classList.toggle("visit",visit);
      mTitle.textContent=visit?"Book a Site Visit":"Send Us an Enquiry";
      mSub.textContent=visit?"Pick a date and time and our team will confirm your visit.":"Fill in your details and our property expert will get back to you shortly.";
      if(mSubmit)mSubmit.textContent=visit?"Book Visit":"Submit Enquiry";
      modal.querySelectorAll("[data-vreq]").forEach(function(el){ if(visit)el.setAttribute("required","required"); else el.removeAttribute("required"); });
      clearErrors(lForm);
      modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
    }
    function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
    document.querySelectorAll("[data-modal]").forEach(function(t){
      t.addEventListener("click",function(e){e.preventDefault();openModal(t.getAttribute("data-modal"));});
    });
    modal.querySelector(".modal-close").addEventListener("click",closeModal);
    modal.addEventListener("click",function(e){ if(e.target===modal)closeModal(); });
    document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&modal.classList.contains("open"))closeModal(); });
    lForm.addEventListener("submit",function(e){
      e.preventDefault();
      clearErrors(lForm);
      var st=lForm.querySelector(".form-status");
      var name=lForm.name.value.trim(), phone=lForm.phone.value.trim(), email=lForm.email.value.trim();
      var emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/, valid=true;
      if(!name){ showError(lForm.name, "Please enter your name."); valid=false; }
      if(!phone){ showError(lForm.phone, "Please enter your mobile number."); valid=false; }
      if(email && !emailRe.test(email)){ showError(lForm.email, "Please enter a valid email address."); valid=false; }
      var visit=mBox.classList.contains("visit");
      if(visit){
        if(!lForm.visitdate.value){ showError(lForm.visitdate, "Please choose your preferred visit date."); valid=false; }
        if(!lForm.slot.value){ showError(lForm.slot, "Please select a preferred time window."); valid=false; }
      }
      if(!valid){ if(st){st.textContent="Please fix the errors above."; st.style.color="#d33";} return; }
      if(st){st.textContent="Sending…"; st.style.color="#8a97a6";}
      var data=new FormData(lForm); data.append("type", visit?"visit":"enquiry");
      fetch("send-lead.php",{method:"POST",body:data})
        .then(function(r){return r.json();})
        .then(function(res){
          if(res && res.ok){ if(st){st.textContent=visit?"Thank you! Your visit request has been sent. We'll confirm shortly.":"Thank you! Our team will contact you shortly."; st.style.color="#1a8a5a";} lForm.reset(); }
          else { if(st){st.textContent=(res&&res.error)||"Something went wrong. Please try again."; st.style.color="#d33";} }
        })
        .catch(function(){ if(st){st.textContent="Unable to send right now. Please call us at 044 4000 5000."; st.style.color="#d33";} });
    });
  }

 /* ---- Generic carousel (scroll-snap + arrows) ---- */
 document.querySelectorAll("[data-carousel]").forEach(function(c){
   var track=c.querySelector(".carousel-track"),
       prev=c.querySelector(".carousel-prev"),next=c.querySelector(".carousel-next");
   function step(){ var card=track.firstElementChild; if(!card)return track.clientWidth; var g=parseFloat(getComputedStyle(track).gap)||24; return card.getBoundingClientRect().width+g; }
   prev&&prev.addEventListener("click",function(){track.scrollBy({left:-step(),behavior:"smooth"});});
   next&&next.addEventListener("click",function(){track.scrollBy({left:step(),behavior:"smooth"});});
 });

 /* ---- Reveal on scroll ---- */
 var rev=document.querySelectorAll("[data-reveal]");
 if("IntersectionObserver"in window&&rev.length){var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);}});},{threshold:.12});rev.forEach(function(el){io.observe(el);});}
 else rev.forEach(function(el){el.classList.add("in");});

 /* ---- Counters ---- */
 var cs=document.querySelectorAll("[data-count]");
 if("IntersectionObserver"in window&&cs.length){var cio=new IntersectionObserver(function(e){e.forEach(function(x){if(!x.isIntersecting)return;var el=x.target,t=parseFloat(el.getAttribute("data-count")),d=t%1?1:0,s=null;function st(ts){if(!s)s=ts;var p=Math.min((ts-s)/1500,1),e2=1-Math.pow(1-p,3);el.textContent=(t*e2).toFixed(d);if(p<1)requestAnimationFrame(st);else el.textContent=t.toFixed(d);}requestAnimationFrame(st);cio.unobserve(el);});},{threshold:.5});cs.forEach(function(c){cio.observe(c);});}

 /* ---- Filter tabs ---- */
 document.querySelectorAll(".filter-tabs").forEach(function(bar){var tabs=bar.querySelectorAll("button");tabs.forEach(function(tab){tab.addEventListener("click",function(){tabs.forEach(function(t){t.classList.remove("active");});tab.classList.add("active");var f=tab.getAttribute("data-filter"),grid=bar.nextElementSibling;grid&&grid.querySelectorAll("[data-cat]").forEach(function(cd){cd.style.display=(f==="all"||cd.getAttribute("data-cat")===f)?"":"none";});});});});

 /* ---- To top ---- */
 var tt = document.querySelector(".to-top");
 var ttProg = document.getElementById("toTopProgress");
 window.addEventListener("scroll", function() {
     if(tt) tt.classList.toggle("show", window.scrollY > 300);
     if(ttProg) {
         var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
         var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
         var scrolled = (winScroll / height) * 100;
         ttProg.style.height = scrolled + "%";
     }
 });
 if(tt) { tt.addEventListener("click", function(){window.scrollTo({top:0,behavior:"smooth"});}); }

 /* ---- Form ---- */
 var f=document.getElementById("enquiry-form");
 f&&f.addEventListener("submit",function(e){
   e.preventDefault();
   clearErrors(f);
   var m=f.querySelector(".form-status");
   var name=f.name?f.name.value.trim():"", phone=f.phone?f.phone.value.trim():"", email=f.email?f.email.value.trim():"";
   var emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/, valid=true;
   if(f.name && !name){ showError(f.name, "Please enter your name."); valid=false; }
   if(f.phone && !phone){ showError(f.phone, "Please enter your mobile number."); valid=false; }
   if(email && !emailRe.test(email)){ showError(f.email, "Please enter a valid email address."); valid=false; }
   if(!valid){ if(m){m.textContent="Please fix the errors above."; m.style.color="#d33";} return; }
   if(m){m.textContent="Sending…";m.style.color="#8a97a6";}
   var data=new FormData(f); data.append("type","enquiry");
   fetch("send-lead.php",{method:"POST",body:data})
     .then(function(r){return r.json();})
     .then(function(res){ if(m){ if(res&&res.ok){m.textContent="Thank you! Our team will contact you shortly.";m.style.color="#1a8a5a";f.reset();} else {m.textContent=(res&&res.error)||"Something went wrong. Please try again.";m.style.color="#d33";} } })
     .catch(function(){ if(m){m.textContent="Unable to send right now. Please call us at 044 4000 5000.";m.style.color="#d33";} });
 });
 
 /* ---- Hero Slider ---- */
 var hs=document.getElementById("heroSlider");
 if(hs){
   var sl=hs.querySelectorAll(".hero-slide"), dt=hs.querySelectorAll(".hero-dot"), idx=0, st;
   function showSlide(i){
     sl[idx].classList.remove("active");
     if(dt[idx]) dt[idx].classList.remove("active");
     idx=i;
     sl[idx].classList.add("active");
     if(dt[idx]) dt[idx].classList.add("active");
   }
   function nextSlide(){ showSlide((idx+1)%sl.length); }
   for(var i=0;i<dt.length;i++){
     (function(j){
       dt[j].addEventListener("click",function(){ showSlide(j); clearInterval(st); st=setInterval(nextSlide,6000); });
     })(i);
   }
   st=setInterval(nextSlide,6000);
 }

 var y=document.getElementById("year");y&&(y.textContent=new Date().getFullYear());
})();

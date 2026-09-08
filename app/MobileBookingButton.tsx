"use client";

import { useEffect, useState } from "react";

export function MobileBookingButton(){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    let frame=0;
    const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const booking=document.getElementById("book");setVisible(Boolean(booking&&booking.getBoundingClientRect().bottom<=0));});};
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
  },[]);
  return <a className={`yaz-mobile-book${visible?" is-visible":""}`} href="#book" aria-hidden={!visible} tabIndex={visible?0:-1}>Reserve a table</a>;
}

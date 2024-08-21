import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import google from "@/assets/icons/google.png";
import check from "@/assets/icons/check.png";
import verification from "@/assets/images/verification.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import chat from "@/assets/icons/chat.png";
import profile from "@/assets/icons/profile.png";
import driver from "@/assets/images/driver.png";
import telephone from "@/assets/images/telephone.png";
import email from "@/assets/images/email.png";
import to from "@/assets/images/to.png";
import point from "@/assets/images/point.png";
import noResult from "@/assets/images/noResult.png";
import out from "@/assets/icons/out.png";
import search from "@/assets/icons/search.png";
import pin from "@/assets/icons/pin.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import marker from "@/assets/icons/marker.png";
import map from "@/assets/icons/map.png";
import target from "@/assets/icons/target.png";
import backArrow from "@/assets/icons/back-arrow.png";
import star from "@/assets/icons/star.png";
import dollar from "@/assets/icons/dollar.png";
import person from "@/assets/icons/person.png";
import coches from "@/assets/images/coches.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  verification,
  driver,
  telephone,
  email,
  to,
  point,
  noResult,
  coches,
};

export const icons = {
  google,
  check,
  home,
  list,
  chat,
  profile,
  out,
  search,
  pin,
  selectedMarker,
  marker,
  map,
  target,
  backArrow,
  star,
  dollar,
  person,
};

export const onboarding = [
  {
    id: 1,
    title: "Request Ride",
    description: "Request a ride get picked up by a nearby community driver",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Confirm Your Driver",
    description:
      "Huge drivers network helps you find comforable, safe and cheap ride",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Track your ride",
    description:
      "Know your driver in advance and be able to view current location in real time on the map.",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};

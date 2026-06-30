"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  LayoutDashboard,
  CloudSun,
  Bus,
  Activity,
  Video,
  Newspaper,
  Settings,
  HelpCircle,
  Info,
  LogOut,
  Search,
  MapPin,
  Map as MapIcon,
  Sun,
  Moon,
  Bell,
  Phone,
  ArrowRight,
  ArrowLeft,
  Wind,
  Droplets,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  Maximize2,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";

// --- TRANSLATIONS DICTIONARY ---
const translations = {
  en: {
    logo: "DHAKA",
    dashboard: "Dashboard",
    weather: "Weather",
    transit: "Transit",
    traffic: "Traffic",
    liveStreet: "Live Street",
    newsInfo: "News & Info",
    settings: "Settings",
    support: "Support",
    about: "About",
    logout: "Logout",
    searchPlaceholder: "Search areas, buses...",
    mode: "Mode",
    langName: "English",
    emergency: "Emergency",
    emergencyTitle: "Emergency Services",
    emergencySubtitle: "National helpline & rescue contacts in Dhaka",
    transportAlerts: "Transport Alerts",
    busRoutesStatus: "Bus Routes Status",
    metroRailStatus: "Metro Rail Status",
    cngAvailability: "CNG Availability",
    rickshawAvailability: "Rickshaw Availability",
    goodService: "Good Service",
    minorDelays: "Minor Delays",
    majorDelays: "Major Delays",
    onTime: "On Time",
    delayed: "Delayed",
    disrupted: "Disrupted",
    inStation: "In Station",
    onWay: "On the Way",
    farAway: "Far Away",
    towardsUttara: "Towards Uttara North",
    towardsMotijheel: "Towards Motijheel",
    high: "High",
    moderate: "Moderate",
    low: "Low",
    weatherToday: "Weather Today in",
    feelsLike: "Feels Like",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    uvIndex: "UV Index",
    visibility: "Visibility",
    airQuality: "Air Quality",
    unhealthy: "Unhealthy",
    maskWarning: "Wearing a mask outside is recommended, people with respiratory conditions should limit outdoor exposure.",
    primaryPollutant: "Primary Pollutant",
    allPollutants: "All Pollutants",
    waterloggingRisk: "Waterlogging Risk",
    sunset: "Sunset",
    sunrise: "Sunrise",
    today: "Today",
    forecast: "5-Day Forecast",
    hourlyForecast: "Hourly Forecast",
    latestInArea: "Latest in your area",
    trafficNow: "Traffic Now",
    liveStreetCamera: "Live Street Camera",
    seeDetails: "See details",
    liveLabel: "LIVE",
    satellite: "Satellite Map",
    temperatureMap: "Temperature Map",
    noNotifications: "No new notifications",
    notificationsTitle: "City Alerts & Notifications",
    searchLocation: "Search Location",
    aboutTitle: "About the Dhaka City Dashboard",
    ourMission: "Our Mission:",
    missionContent: "The Dhaka City Dashboard is a web application designed to provide real-time information about various aspects of Dhaka, including weather, transit, traffic, and news. Our goal is to empower Dhaka residents and visitors with the information they need to navigate the city efficiently and make informed decisions about their daily commutes, activities, and safety. We believe that access to timely and accurate information is crucial for a thriving and connected city.",
    dataSources: "Data Sources:",
    dataSourcesContent: "We strive to provide the most accurate and up-to-date information possible. Data is sourced from the following providers:",
    ds1: "Google (for weather data)",
    ds2: "Dhaka Metropolitan Police (for traffic incident reports)",
    ds3: "Bangladesh Railway (for train schedules)",
    ds4: "Dhaka Mass Transit Company Limited (for metro rail information)",
    ds5: "Windy.com",
    ds6: "Community contributions (for user-reported traffic incidents and road conditions)",
    theTeam: "The Team:",
    theTeamContent: "The Dhaka City Dashboard is a project developed by UIUXpert Lab.",
    farhanaBio: "Farhana Akther Kabita: UI/UX Designer - Passionate about building accessible, interactive civic tech that bridges the gap between public services and modern citizens.",
    mushfiqurBio: "Mushfiqur Rahman Sadi: UI/UX Designer - Focuses on spatial data integration, dynamic user widgets, and optimization of real-time monitoring panels.",
    contactUs: "Contact Us:",
    contactDetails: "Email Address: dhk@citydb.bd",
    settingsGeneral: "General",
    settingsUnits: "Units: Temperature in",
    settingsRefresh: "Data refresh rate:",
    settingsWeather: "Weather",
    settingsWeatherAlert: "Weather alerts",
    settingsTransit: "Transit",
    settingsPrefRoutes: "Preferred Routes: Allow users to save frequently used routes for quicker access.",
    settingsTraffic: "Traffic",
    settingsTrafficAlert: "Traffic alerts",
    settingsCongestionAlerts: "Congestion (Traffic Jam) alerts",
    settingsNews: "News & Info",
    settingsNewsSources: "News Sources: Allow users to select preferred news sources or categories.",
    supportFaqs: "FAQs",
    supportGeneralFaqs: "General FAQs:",
    supportWeatherFaqs: "Weather FAQs:",
    supportTransitFaqs: "Transit FAQs:",
    supportTrafficFaqs: "Traffic FAQs:",
    supportNewsFaqs: "News & Info FAQs:",
    supportContactInfo: "Contact Information:",
    supportMessageUs: "Message us:",
    supportFeedbackTitle: "Feedback:",
    supportFeedbackDesc: "Feedback about the dashboard, report bugs, or suggest improvements:",
    supportSubject: "Subject",
    supportUpload: "Upload attachment",
    supportDescribe: "Describe your problems",
    supportSend: "Send Message",
    supportSubmitFeedback: "Submit Feedback",
    faqQ1: "What is the Dhaka City Dashboard?",
    faqA1: "Dhaka City Dashboard is an interactive portal offering live updates on weather, traffic jams, metro rail, bus alerts, and critical city emergency updates.",
    faqQ2: "How often is the data updated?",
    faqA2: "Transit alerts, weather logs, and traffic conditions refresh automatically based on your refresh settings (5s, 10s, 15s, or 30s).",
    faqQ3: "How can I report an issue with the dashboard?",
    faqA3: "Navigate to the Feedback section on this page, fill out the form with a description and optional screenshots, and submit.",
    faqQ4: "Where does the weather data come from?",
    faqA4: "Weather and air quality (AQI) values are collected from regional meteorological sensors, Google Weather, and Windy.com APIs.",
    faqQ5: "Why is the 'Feels Like' temperature different from the actual temperature?",
    faqA5: "It accounts for ambient humidity, wind speed, solar radiation, and particulate haze which impact human temperature perception.",
    faqQ6: "How can I find route information?",
    faqA6: "Use the Transit view or search tool in the alerts panel to find operating bus and train routes, schedules, and delays.",
    faqQ7: "Is the schedule real-time?",
    faqA7: "Yes, Metro Rail and bus timetables are updated dynamically using GPS tracking and reports from local traffic centers.",
    faqQ8: "How can I report a traffic jam?",
    faqA8: "Registered contributors can report traffic incidents directly. Regular users can submit road condition feedback using the support form.",
    faqQ9: "Where does the traffic data come from?",
    faqA9: "Traffic congestion indexes are calculated from municipal CCTV camera feeds, speed sensors, and community user reports.",
    faqQ10: "How can I change the news sources?",
    faqA10: "You can toggle the customized News Sources switch on the Settings page to filter local reports vs national agency feeds.",
    messageSent: "Your message has been sent successfully!",
    feedbackSent: "Your feedback has been submitted successfully!",
  },
  bn: {
    logo: "ঢাকা",
    dashboard: "ড্যাশবোর্ড",
    weather: "আবহাওয়া",
    transit: "ট্রানজিট",
    traffic: "ট্রাফিক",
    liveStreet: "লাইভ স্ট্রিট",
    newsInfo: "খবর ও তথ্য",
    settings: "সেটিংস",
    support: "সহায়তা",
    about: "সম্পর্কে",
    logout: "লগআউট",
    searchPlaceholder: "এলাকা বা বাস খুঁজুন...",
    mode: "মোড",
    langName: "বাংলা",
    emergency: "জরুরি সেবা",
    emergencyTitle: "জরুরি সেবা নম্বরসমূহ",
    emergencySubtitle: "জাতীয় হেল্পলাইন ও ঢাকা শহরের উদ্ধারকারী দল",
    transportAlerts: "পরিবহন সতর্কতা",
    busRoutesStatus: "বাস রুটের অবস্থা",
    metroRailStatus: "মেট্রোরেলের অবস্থা",
    cngAvailability: "সিএনজি প্রাপ্যতা",
    rickshawAvailability: "রিকশা প্রাপ্যতা",
    goodService: "চলতি সেবা",
    minorDelays: "সামান্য বিলম্ব",
    majorDelays: "দীর্ঘ বিলম্ব",
    onTime: "সময়মতো",
    delayed: "বিলম্বিত",
    disrupted: "বিঘ্নিত",
    inStation: "স্টেশনে আছে",
    onWay: "পথে আছে",
    farAway: "স্টেশন থেকে দূরে",
    towardsUttara: "উত্তরা উত্তরের দিকে",
    towardsMotijheel: "মতিঝিলের দিকে",
    high: "উচ্চ",
    moderate: "মাঝারি",
    low: "কম",
    weatherToday: "আজকের আবহাওয়া -",
    feelsLike: "অনুভূত তাপমাত্রা",
    humidity: "আর্দ্রতা",
    wind: "বাতাস",
    pressure: "বায়ুচাপ",
    uvIndex: "ইউভি ইনডেক্স",
    visibility: "দৃশ্যমানতা",
    airQuality: "বায়ুর মান",
    unhealthy: "অস্বাস্থ্যকর",
    maskWarning: "বাইরে মাস্ক পরার পরামর্শ দেওয়া হচ্ছে, শ্বাসকষ্টের রোগীদের বাইরে যাতায়াত সীমিত করা উচিত।",
    primaryPollutant: "প্রধান দূষক",
    allPollutants: "সকল দূষক",
    waterloggingRisk: "জলজট ঝুঁকি",
    sunset: "সূর্যাস্ত",
    sunrise: "সূর্যোদয়",
    today: "আজ",
    forecast: "৫ দিনের পূর্বাভাস",
    hourlyForecast: "ঘণ্টাভিত্তিক পূর্বাভাস",
    latestInArea: "আপনার এলাকার সর্বশেষ সংবাদ",
    trafficNow: "বর্তমান ট্রাফিক",
    liveStreetCamera: "লাইভ স্ট্রিট ক্যামেরা",
    seeDetails: "বিস্তারিত দেখুন",
    liveLabel: "সরাসরি",
    satellite: "স্যাটেলাইট মানচিত্র",
    temperatureMap: "তাপমাত্রা মানচিত্র",
    noNotifications: "কোনো নতুন বিজ্ঞপ্তি নেই",
    notificationsTitle: "শহরের সতর্কতা ও বিজ্ঞপ্তি",
    searchLocation: "লোকেশন খুঁজুন",
    aboutTitle: "ঢাকা সিটি ড্যাশবোর্ড সম্পর্কে",
    ourMission: "আমাদের লক্ষ্য:",
    missionContent: "ঢাকা সিটি ড্যাশবোর্ড একটি ওয়েব অ্যাপ্লিকেশন যা আবহাওয়া, ট্রানজিট, ট্রাফিক এবং সংবাদসহ ঢাকার বিভিন্ন বিষয়ে রিয়েল-টাইম তথ্য প্রদানের জন্য তৈরি করা হয়েছে। আমাদের লক্ষ্য হলো ঢাকার বাসিন্দা এবং দর্শনার্থীদের সেইসব তথ্য দিয়ে ক্ষমতায়ন করা যা তাদের দক্ষতার সাথে যাতায়াত করতে এবং তাদের দৈনিক যাতায়াত, কার্যক্রম এবং নিরাপত্তা সম্পর্কে সচেতন সিদ্ধান্ত নিতে সাহায্য করবে। আমরা বিশ্বাস করি যে একটি সমৃদ্ধ ও সংযুক্ত শহরের জন্য সঠিক ও সময়োপযোগী তথ্য পাওয়া অত্যন্ত গুরুত্বপূর্ণ।",
    dataSources: "উৎসসমূহ:",
    dataSourcesContent: "আমরা সবচেয়ে সঠিক এবং আপ-টু-ডেট তথ্য প্রদান করার চেষ্টা করি। ডেটা নিম্নলিখিত উৎসসমূহ থেকে নেওয়া হয়েছে:",
    ds1: "গুগল (আবহাওয়া তথ্যের জন্য)",
    ds2: "ঢাকা মেট্রোপলোটন পুলিশ (ট্রাফিক দুর্ঘটনার রিপোর্টের জন্য)",
    ds3: "বাংলাদেশ রেলওয়ে (ট্রেন সময়সূচীর জন্য)",
    ds4: "ঢাকা ম্যাস ট্রানজিট কোম্পানি লিমিটেড (মেট্রোরেল তথ্যের জন্য)",
    ds5: "Windy.com (উইন্ডি ডট কম)",
    ds6: "কমিউনিটি অবদানকারী (ব্যবহারকারী-রিপোর্ট করা ট্রাফিক দুর্ঘটনা এবং রাস্তার অবস্থার জন্য)",
    theTeam: "দল:",
    theTeamContent: "ঢাকা সিটি ড্যাশবোর্ড হলো UIUXpert Lab দ্বারা তৈরি একটি প্রকল্প।",
    farhanaBio: "ফারহানা আক্তার কবিতা: ইউআই/ইউএক্স ডিজাইনার - নাগরিক ও সরকারি তথ্যের সহজ আদানপ্রদানের জন্য একটি ব্যবহারকারী-বান্ধব ইন্টারেক্টিভ সিস্টেম তৈরিতে প্রতিশ্রুতিবদ্ধ।",
    mushfiqurBio: "মুশফিকুর রহমান সাদী: ইউআই/ইউএক্স ডিজাইনার - স্পেশাল ডাটা ইন্টিগ্রেশন, ডায়নামিক উইজেট ও ট্রাফিক মনিটরিং প্যানেল অপ্টিমাইজেশানে মনোযোগ দেন।",
    contactUs: "যোগাযোগ করুন:",
    contactDetails: "ইমেইল ঠিকানা: dhk@citydb.bd",
    settingsGeneral: "সাধারণ সেটিংস",
    settingsUnits: "ইউনিট: তাপমাত্রা প্রদর্শন",
    settingsRefresh: "ডেটা রিফ্রেশ রেট:",
    settingsWeather: "আবহাওয়া",
    settingsWeatherAlert: "আবহাওয়া সতর্কতা",
    settingsTransit: "ট্রানজিট",
    settingsPrefRoutes: "পছন্দের রুট: দ্রুত অ্যাক্সেসের জন্য প্রায়শই ব্যবহৃত রুট সংরক্ষণ করতে দিন।",
    settingsTraffic: "ট্রাফিক",
    settingsTrafficAlert: "ট্রাফিক সতর্কতা",
    settingsCongestionAlerts: "যানজট (ট্রাফিক জ্যাম) সতর্কতা",
    settingsNews: "খবর ও তথ্য",
    settingsNewsSources: "সংবাদের উৎস: ব্যবহারকারীদের পছন্দের সংবাদের উৎস বা বিভাগ নির্বাচন করতে দিন।",
    supportFaqs: "সাধারণ জিজ্ঞাসা (FAQs)",
    supportGeneralFaqs: "সাধারণ প্রশ্নাবলি:",
    supportWeatherFaqs: "আবহাওয়া প্রশ্নাবলি:",
    supportTransitFaqs: "ট্রানজিট প্রশ্নাবলি:",
    supportTrafficFaqs: "ট্রাফিক প্রশ্নাবলি:",
    supportNewsFaqs: "খবর ও তথ্য প্রশ্নাবলি:",
    supportContactInfo: "যোগাযোগের ঠিকানা:",
    supportMessageUs: "আমাদের বার্তা পাঠান:",
    supportFeedbackTitle: "ফিডব্যাক ফর্ম:",
    supportFeedbackDesc: "ড্যাশবোর্ড সম্পর্কে ফিডব্যাক দিন, বাগ রিপোর্ট করুন বা উন্নতির পরামর্শ দিন:",
    supportSubject: "বিষয়",
    supportUpload: "ফাইল সংযুক্ত করুন",
    supportDescribe: "আপনার সমস্যা বিস্তারিত লিখুন",
    supportSend: "বার্তা পাঠান",
    supportSubmitFeedback: "ফিডব্যাক জমা দিন",
    faqQ1: "ঢাকা সিটি ড্যাশবোর্ড কি?",
    faqA1: "ঢাকা সিটি ড্যাশবোর্ড হলো একটি ইন্টারেক্টিভ পোর্টাল যা আবহাওয়া, যানজট, মেট্রোরেল, বাস রুট এবং শহরের জরুরি অবস্থার সরাসরি আপডেট প্রদান করে।",
    faqQ2: "কত ঘন ঘন ডেটা আপডেট করা হয়?",
    faqA2: "আপনার রিফ্রেশ সেটিংস (৫ সে, ১০ সে, ১৫ সে বা ৩০ সে) এর ওপর ভিত্তি করে ডেটা স্বয়ংক্রিয়ভাবে আপডেট হয়।",
    faqQ3: "আমি কীভাবে ড্যাশবোর্ডের কোনো ত্রুটি রিপোর্ট করব?",
    faqA3: "এই পৃষ্ঠার ফিডব্যাক বিভাগে যান, বিবরণ ও স্ক্রিনশট সহ ফর্মটি পূরণ করুন এবং জমা দিন।",
    faqQ4: "আবহাওয়ার ডেটা কোথা থেকে আসে?",
    faqA4: "আবহাওয়া এবং বায়ুর মান (AQI) স্থানীয় আবহাওয়া স্টেশন, গুগল ওয়েদার এবং Windy.com এপিআই থেকে নেওয়া হয়।",
    faqQ5: "প্রকৃত তাপমাত্রার চেয়ে অনুভূত তাপমাত্রা ভিন্ন কেন?",
    faqA5: "এটি বাতাসের আর্দ্রতা, গতি, সৌর বিকিরণ ও কুয়াশার মাত্রা হিসাব করে যা মানুষের প্রকৃত তাপমাত্রা অনুভূতিকে প্রভাবিত করে।",
    faqQ6: "আমি কীভাবে রুটের তথ্য জানতে পারি?",
    faqA6: "চলতি বাস ও ট্রেনের রুট, সময়সূচী এবং বিলম্বের তথ্য জানতে ট্রানজিট ভিউ বা অনুসন্ধান প্যানেল ব্যবহার করুন।",
    faqQ7: "সময়সূচী কি বাস্তব সময়ের (রিয়েল-টাইম)?",
    faqA7: "হ্যাঁ, জিপিএস ট্র্যাকিং এবং ট্রাফিক কন্ট্রোল বোর্ডের ডেটার সাহায্যে সময়সূচী ডায়নামিকালি আপডেট করা হয়।",
    faqQ8: "আমি কীভাবে যানজটের তথ্য রিপোর্ট করব?",
    faqA8: "নিবন্ধিত ব্যবহারকারীরা সরাসরি ট্রাফিক রিপোর্ট দিতে পারেন। সাধারণ ব্যবহারকারীরা ফর্ম ব্যবহার করে ফিডব্যাক দিতে পারেন।",
    faqQ9: "ট্রাফিক ডেটা কোথা থেকে সংগৃহীত হয়?",
    faqA9: "পৌর সিসিটিভি ক্যামেরা ফিড, স্পিড ট্র্যাকার এবং সাধারণ ব্যবহারকারীদের ইনপুটের সাহায্যে যানজটের সূচক হিসাব করা হয়।",
    faqQ10: "আমি কীভাবে খবরের সোর্স পরিবর্তন করতে পারি?",
    faqA10: "স্থানীয় বনাম জাতীয় খবরের ফিড ফিল্টার করতে সেটিংস পেজে গিয়ে 'সংবাদের উৎস' অন বা অফ করুন।",
    messageSent: "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!",
    feedbackSent: "আপনার ফিডব্যাকটি সফলভাবে জমা দেওয়া হয়েছে!",
  }
};

// --- EMERGENCY NUMBERS ---
const emergencyContacts = [
  { service: "National Emergency Helpline", number: "999", desc: "For Police, Fire, and Ambulance services nationwide.", icon: Phone, color: "text-red-600 bg-red-50 border-red-200" },
  { service: "Dhaka Fire Service Headquarters", number: "02-9555555", desc: "Direct response line for firefighting in Dhaka metropolitan area.", icon: AlertTriangle, color: "text-orange-600 bg-orange-50 border-orange-200" },
  { service: "Dhaka Metropolitan Police (DMP)", number: "01713-373100", desc: "Direct control room desk for emergency police assistance.", icon: AlertTriangle, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { service: "Dhaka WASA Water Supply Emergency", number: "16162", desc: "For complaints regarding water logging, pipe bursts, or water shortage.", icon: Droplets, color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
  { service: "Government Health Call Center (Shastho Batayon)", number: "16263", desc: "24/7 direct doctor consultation and medical help desk.", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" }
];

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<string>("transit"); // Match image 1 initially (Transit selected)
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("Mirpur 10");
  const [showLocationDropdown, setShowLocationDropdown] = useState<boolean>(false);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const [showCameraModal, setShowCameraModal] = useState<string | null>(null);
  const [showNewsModal, setShowNewsModal] = useState<number | null>(null);
  
  // Real-time Clock
  const [currentTime, setCurrentTime] = useState<string>("01:25 AM");
  const [currentDate, setCurrentDate] = useState<string>("Friday | 13-Dec-2024");
  
  // Search & Filter for Transport Alerts
  const [alertsSearch, setAlertsSearch] = useState<string>("");
  const [alertsFilter, setAlertsFilter] = useState<string>("all");

  // Settings States
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");
  const [refreshRate, setRefreshRate] = useState<number>(10);
  const [weatherAlerts, setWeatherAlerts] = useState<boolean>(true);
  const [preferredRoutes, setPreferredRoutes] = useState<boolean>(true);
  const [trafficAlerts, setTrafficAlerts] = useState<boolean>(true);
  const [congestionAlerts, setCongestionAlerts] = useState<boolean>(true);
  const [newsSources, setNewsSources] = useState<boolean>(true);

  // Support & Feedback States
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [feedbackSubject, setFeedbackSubject] = useState<string>("");
  const [feedbackDesc, setFeedbackDesc] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated background data refresh trigger
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1);
    }, refreshRate * 1000);
    return () => clearInterval(interval);
  }, [refreshRate]);

  // Camera canvas references for animated noise/traffic
  const canvasRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});

  const t = translations[lang];

  const formatTemp = (celsius: number) => {
    if (tempUnit === "F") {
      return `${Math.round((celsius * 9) / 5 + 32)}° F`;
    }
    return `${celsius}° C`;
  };

  const formatTempFull = (celsius: number) => {
    if (tempUnit === "F") {
      return `${Math.round((celsius * 9) / 5 + 32)}° Fahrenheit`;
    }
    return `${celsius}° Celsius`;
  };

  const formatTempNum = (celsius: number) => {
    if (tempUnit === "F") {
      return `${Math.round((celsius * 9) / 5 + 32)}°`;
    }
    return `${celsius}°`;
  };

  // List of Available locations for simulation
  const locationsList = ["Mirpur 10", "Dhanmondi 27", "Gulshan 2", "Uttara Sector 7", "Banani", "Mohakhali", "Farmgate", "Motijheel"];

  // Update clock simulating a ticking dashboard
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Match exactly Friday | 13-Dec-2024 from the images or show live ticking format
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
      const formattedDate = now.toLocaleDateString(lang === 'en' ? 'en-US' : 'bn-BD', options);
      const formattedTime = now.toLocaleTimeString(lang === 'en' ? 'en-US' : 'bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
      
      setCurrentTime(formattedTime);
      setCurrentDate(formattedDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // Handle outside click close for location dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (showLocationDropdown && !(e.target as HTMLElement).closest(".location-selector")) {
        setShowLocationDropdown(false);
      }
      if (showNotificationPanel && !(e.target as HTMLElement).closest(".notification-trigger")) {
        setShowNotificationPanel(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showLocationDropdown, showNotificationPanel]);

  // Simulated traffic rendering for camera streams
  useEffect(() => {
    const canvasIds = ["mirpur10", "avenue5", "rokeya"];
    const intervals: NodeJS.Timeout[] = [];

    canvasIds.forEach((id) => {
      const canvas = canvasRefs.current[id];
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let frame = 0;
      // Setup cars
      const cars = Array.from({ length: 6 }, () => ({
        x: Math.random() * canvas.width,
        y: 40 + Math.random() * (canvas.height - 80),
        speed: 1 + Math.random() * 2,
        color: ["#ef4444", "#3b82f6", "#eab308", "#10b981", "#ffffff"][Math.floor(Math.random() * 5)],
        size: 14 + Math.random() * 6
      }));

      const animate = () => {
        if (!ctx || !canvas) return;
        ctx.fillStyle = "#1e293b"; // Asphalt
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw road lines
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 4;
        ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

        // Center line
        ctx.strokeStyle = "#e2e8f0";
        ctx.setLineDash([15, 15]);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw cars
        cars.forEach((car) => {
          ctx.fillStyle = car.color;
          ctx.beginPath();
          ctx.roundRect(car.x, car.y, car.size, car.size / 1.6, 3);
          ctx.fill();

          // Headlights
          ctx.fillStyle = "#fef08a";
          ctx.beginPath();
          ctx.arc(car.x + car.size, car.y + 2, 2, 0, Math.PI * 2);
          ctx.arc(car.x + car.size, car.y + (car.size / 1.6) - 2, 2, 0, Math.PI * 2);
          ctx.fill();

          // Move cars
          car.x += car.speed;
          if (car.x > canvas.width) {
            car.x = -car.size;
            car.y = 40 + Math.random() * (canvas.height - 80);
          }
        });

        // Scanline CCTV effect
        ctx.fillStyle = "rgba(16, 185, 129, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        for (let i = 0; i < canvas.height; i += 4) {
          ctx.fillRect(0, i, canvas.width, 1);
        }

        // Camera overlay details
        ctx.fillStyle = "#ffffff";
        ctx.font = "10px monospace";
        ctx.fillText(`CAM-${id.toUpperCase()} 1080p`, 15, 20);
        ctx.fillText(`FPS: 30.00`, 15, canvas.height - 15);
        ctx.fillText(new Date().toLocaleTimeString(), canvas.width - 90, 20);

        // Flashing REC red dot
        if (Math.floor(frame / 15) % 2 === 0) {
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(canvas.width - 15, canvas.height - 18, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        frame++;
      };

      const interval = setInterval(animate, 33);
      intervals.push(interval);
    });

    return () => {
      intervals.forEach((i) => clearInterval(i));
    };
  }, [activeTab, showCameraModal]);

  // Dynamic simulation data based on location selection
  const currentDetails = useMemo(() => {
    let multiplier = 1.0;
    if (location.includes("Gulshan")) multiplier = 1.15;
    if (location.includes("Dhanmondi")) multiplier = 0.95;
    if (location.includes("Uttara")) multiplier = 0.85;
    if (location.includes("Motijheel")) multiplier = 1.25;

    // Small random fluctuation based on refresh trigger
    const fluctuation = (Math.sin(refreshTrigger) * 2);

    return {
      temp: Math.round(23 * multiplier + fluctuation / 2),
      feelsLike: Math.round(21 * multiplier + fluctuation / 2),
      aqi: Math.round(201 * multiplier + fluctuation * 4),
      pm25: Math.round(241 * multiplier + fluctuation * 5),
      waterloggingRisk: Math.min(100, Math.max(0, Math.round(73 * multiplier + fluctuation))),
      cngAvailability: {
        high: Math.min(100, Math.max(0, Math.round(70 / multiplier + fluctuation))),
        mod: Math.min(100, Math.max(0, Math.round(22 * multiplier - fluctuation))),
        low: Math.min(100, Math.max(0, Math.round(8 * multiplier))),
      },
      rickshawAvailability: {
        high: Math.min(100, Math.max(0, Math.round(95 / multiplier + fluctuation / 2))),
        mod: Math.min(100, Math.max(0, Math.round(3 * multiplier - fluctuation / 2))),
        low: Math.min(100, Math.max(0, Math.round(2 * multiplier))),
      }
    };
  }, [location, refreshTrigger]);

  // --- MOCK DATA LISTS ---
  const transportAlertsList = [
    { name: "Metro Line 1", status: "Good Service", color: "green" },
    { name: "Bus Route 18", status: "Major Delays", color: "red" },
    { name: "Kazipara", status: "Minor Delays", color: "orange" },
    { name: "Avenue 5", status: "Good Service", color: "green" },
    { name: "Shewrapara", status: "Major Delays", color: "red" },
    { name: "Mirpur 14", status: "Minor Delays", color: "orange" },
    { name: "Dhanmondi", status: "Major Delays", color: "red" },
    { name: "Gulshan", status: "Minor Delays", color: "orange" },
    { name: "Banani", status: "Good Service", color: "green" },
    { name: "Uttara", status: "Major Delays", color: "red" },
    { name: "Airport Road", status: "Minor Delays", color: "orange" },
    { name: "Mohakhali", status: "Major Delays", color: "red" },
    { name: "Farmgate", status: "Minor Delays", color: "orange" },
    { name: "Dhanmondi 27", status: "Good Service", color: "green" },
    { name: "Bashundhara R/A", status: "Major Delays", color: "red" },
    { name: "Gulshan 2", status: "Major Delays", color: "red" },
    { name: "Baridhara", status: "Major Delays", color: "red" },
    { name: "Uttara Sector 7", status: "Minor Delays", color: "orange" },
    { name: "Mirpur DOHS", status: "Good Service", color: "green" },
    { name: "New Market", status: "Major Delays", color: "red" },
    { name: "Khilgaon", status: "Minor Delays", color: "orange" },
    { name: "Tejgaon", status: "Major Delays", color: "red" },
    { name: "Mohammadpur", status: "Minor Delays", color: "orange" },
    { name: "Savar", status: "Good Service", color: "green" },
    { name: "Gazipur", status: "Major Delays", color: "red" },
  ];

  const busRoutesStatus = [
    { name: "Bus Route 18", status: "Disrupted", color: "red" },
    { name: "Dhanmondi", status: "Delayed", color: "orange" },
    { name: "Baridhara", status: "Delayed", color: "orange" },
    { name: "Mirpur 14", status: "On Time", color: "green" },
    { name: "Gulshan", status: "Delayed", color: "orange" },
    { name: "Gazipur", status: "Disrupted", color: "red" },
    { name: "Uttara", status: "On Time", color: "green" },
    { name: "Mohakhali", status: "On Time", color: "green" },
    { name: "Savar", status: "Disrupted", color: "red" },
  ];

  const newsList = [
    {
      id: 1,
      title: "Mirpur 10 hospitals on the frontline",
      summary: "Medical teams set up emergency response units as patient counts rise due to seasonal heat and fever cases.",
      full: "Dhaka city hospitals in Mirpur 10 are facing a massive surge in admissions due to heat-related illnesses and water-borne viruses. The health department has requested all available medical teams to remain on active duty and set up temporary cooling rooms.",
      tag: "Emergency Alert",
      image: "linear-gradient(135deg, #f87171, #ef4444)"
    },
    {
      id: 2,
      title: "Protests, rallies held in Mirpur 10",
      summary: "Local transport affected as demonstrators gather near the round-about requesting traffic safety infrastructure.",
      full: "Major traffic blockages were reported in Mirpur 10 round-about as student unions and local residents held peace rallies demanding safer pedestrian crossings and strict speed limits for local city buses.",
      tag: "Road Block",
      image: "linear-gradient(135deg, #fbcfe8, #ec4899)"
    },
    {
      id: 3,
      title: "Army, police vehicles torched during clash",
      summary: "Security heightened in key areas after overnight incidents involving local vandals near bypass lanes.",
      full: "Following late-night clashes between rival activist groups, law enforcement agencies have deployed extra personnel along Rokeya Avenue. Two security vehicles were damaged, and citizens are advised to avoid bypass lanes after 10 PM.",
      tag: "Security",
      image: "linear-gradient(135deg, #fed7aa, #f97316)"
    }
  ];

  const cameraFeeds = [
    { id: "mirpur10", name: "Mirpur 10 Circle", live: true },
    { id: "avenue5", name: "Avenue 5", live: true },
    { id: "rokeya", name: "Begum Rokeya Avenue", live: true }
  ];

  // Filtering transport alerts based on search query and filter selection
  const filteredAlerts = useMemo(() => {
    return transportAlertsList.filter((alert) => {
      const matchesSearch = alert.name.toLowerCase().includes(alertsSearch.toLowerCase());
      if (alertsFilter === "all") return matchesSearch;
      if (alertsFilter === "good") return matchesSearch && alert.status === "Good Service";
      if (alertsFilter === "minor") return matchesSearch && alert.status === "Minor Delays";
      if (alertsFilter === "major") return matchesSearch && alert.status === "Major Delays";
      return matchesSearch;
    });
  }, [alertsSearch, alertsFilter]);

  // Simple notifications to show in panel
  const notifications = [
    { id: 1, title: "Emergency Broadcast", text: "Water logging hazard reported in Dhanmondi Sector 27. Seek alternative route.", time: "10m ago", level: "high" },
    { id: 2, title: "Transit Alert", text: "Metro line service disrupted towards Motijheel for maintenance.", time: "25m ago", level: "med" },
    { id: 3, title: "Weather Alert", text: "Air Quality Index exceeds 200 (Unhealthy). Wear masks outdoor.", time: "1h ago", level: "med" }
  ];

  return (
    <div className={`flex flex-row min-h-screen ${isDark ? "bg-[#121212] text-gray-100" : "bg-[#F4F6F8] text-gray-800"} font-sans transition-colors duration-200`}>
      
      {/* ========================================================================= */}
      {/* 1. SIDEBAR (LEFT SECTION) */}
      {/* ========================================================================= */}
      <aside className={`w-[250px] flex-shrink-0 flex flex-col border-r ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} py-6 z-10 relative`}>
        
        {/* Brand Logo */}
        <div className="px-6 pb-4">
          <h1 className="text-[28px] font-extrabold tracking-wider text-[#4CAF50] transition-transform duration-300 hover:scale-105 select-none">
            {t.logo}
          </h1>
        </div>

        {/* Separator line under logo */}
        <div className={`mx-6 mb-6 border-b ${isDark ? "border-zinc-800" : "border-gray-100"}`} />

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {[
            { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
            { id: "weather", label: t.weather, icon: CloudSun },
            { id: "transit", label: t.transit, icon: Bus },
            { id: "traffic", label: t.traffic, icon: Activity },
            { id: "livestreet", label: t.liveStreet, icon: Video },
            { id: "news", label: t.newsInfo, icon: Newspaper }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#78D47E] text-white shadow-sm"
                    : isDark
                      ? "text-gray-400 hover:bg-zinc-800/60 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : isDark ? "text-gray-400" : "text-gray-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className={`my-4 border-b ${isDark ? "border-zinc-800" : "border-gray-100"}`} />

          {/* Settings & Support */}
          {[
            { id: "settings", label: t.settings, icon: Settings },
            { id: "support", label: t.support, icon: HelpCircle },
            { id: "about", label: t.about, icon: Info }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#78D47E] text-white shadow-sm"
                    : isDark
                      ? "text-gray-400 hover:bg-zinc-800/60 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : isDark ? "text-gray-400" : "text-gray-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Bottom Button */}
        <div className="px-4 mt-auto">
          <div className={`mb-4 border-b ${isDark ? "border-zinc-800" : "border-gray-100"}`} />
          <button
            onClick={() => alert("Logged out successfully")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
              isDark
                ? "text-gray-400 hover:bg-red-950/20 hover:text-red-400"
                : "text-gray-600 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            <LogOut className="w-5 h-5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN APP CONTENT CONTAINER */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* ========================================================== */}
        {/* HEADER SECTION */}
        {/* ========================================================== */}
        <header className={`sticky top-0 z-20 flex flex-row items-center justify-between px-8 py-4 border-b ${
          isDark ? "bg-[#1A1A1A]/95 border-zinc-800 backdrop-blur-md" : "bg-white/95 border-gray-200 backdrop-blur-md"
        } transition-colors duration-200`}>
          
          {/* Time & Date Display */}
          <div className="flex items-center gap-3">
            <Clock className={`w-8 h-8 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
            <div>
              <h2 className="text-xl font-bold tracking-tight">{currentTime}</h2>
              <p className={`text-[12px] ${isDark ? "text-gray-500" : "text-gray-400"} font-medium`}>{currentDate}</p>
            </div>
          </div>

          {/* Quick controls pill container */}
          <div className="flex items-center gap-3">
            
            {/* Location selector dropdown pill */}
            <div className="relative location-selector">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className={`px-4 py-1.5 rounded-full border text-sm font-semibold flex items-center gap-1.5 transition-all ${
                  isDark
                    ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
                    : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                }`}
              >
                <MapPin className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>{location}</span>
              </button>
              
              {showLocationDropdown && (
                <div className={`absolute left-0 mt-2 w-48 rounded-xl shadow-lg border overflow-hidden z-30 animate-in fade-in-50 slide-in-from-top-1 ${
                  isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-100"
                }`}>
                  <p className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-gray-400"} border-b ${isDark ? "border-zinc-700" : "border-gray-50"}`}>
                    {t.searchLocation}
                  </p>
                  {locationsList.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors ${
                        location === loc
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                          : isDark
                            ? "text-gray-300 hover:bg-zinc-700/50"
                            : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Map Pill */}
            <button
              onClick={() => setShowMapModal(true)}
              className={`px-4 py-1.5 rounded-full border text-sm font-semibold flex items-center gap-1.5 transition-all ${
                isDark
                  ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
                  : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
              }`}
            >
              <MapIcon className="w-4 h-4 text-indigo-500" />
              <span>Map</span>
            </button>

            {/* Mode (Dark/Light) Pill */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-4 py-1.5 rounded-full border text-sm font-semibold flex items-center gap-1.5 transition-all ${
                isDark
                  ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
                  : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
              <span>{t.mode}</span>
            </button>

            {/* English/Bangla Language Toggle Pill */}
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className={`px-4 py-1.5 rounded-full border text-sm font-semibold flex items-center gap-2 transition-all ${
                isDark
                  ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
                  : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
              }`}
            >
              <span className="text-[13px] font-bold">🌐 {lang === "en" ? "English" : "বাংলা"}</span>
            </button>

            {/* Emergency Hotline Button */}
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="px-4 py-1.5 rounded-full border border-red-500 bg-white text-red-500 hover:bg-red-50 dark:bg-red-950/10 dark:hover:bg-red-950/20 text-sm font-bold flex items-center gap-1.5 transition-all animate-bounce"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>{t.emergency}</span>
            </button>

            {/* Notification Bell trigger */}
            <div className="relative notification-trigger">
              <button
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                className={`p-2 rounded-full border relative transition-all ${
                  isDark
                    ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-gray-200"
                    : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                }`}
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              </button>

              {/* Notification Overlay Menu */}
              {showNotificationPanel && (
                <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg border overflow-hidden z-30 animate-in fade-in-50 slide-in-from-top-1 ${
                  isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-100"
                }`}>
                  <div className={`p-4 border-b ${isDark ? "border-zinc-700" : "border-gray-50"} flex items-center justify-between`}>
                    <h3 className="font-bold text-[14px]">{t.notificationsTitle}</h3>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">3 Alerts</span>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-zinc-700">
                    {notifications.map((item) => (
                      <div key={item.id} className={`p-4 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-700/30 flex gap-3`}>
                        <div className="mt-0.5">
                          {item.level === "high" ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-orange-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[13px] font-bold flex justify-between">
                            <span>{item.title}</span>
                            <span className={`text-[10px] ${isDark ? "text-zinc-500" : "text-gray-400"} font-normal`}>{item.time}</span>
                          </h4>
                          <p className={`text-[12px] mt-0.5 leading-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar section */}
            <div className="flex items-center ml-2 border-l pl-3 border-gray-200 dark:border-zinc-800">
              <div className="w-9 h-9 rounded-full ring-2 ring-[#4CAF50]/30 overflow-hidden cursor-pointer hover:ring-[#4CAF50]/80 transition-all">
                {/* SVG avatar for fallback, ensuring clean rendering with no placeholders */}
                <svg viewBox="0 0 32 32" className="w-full h-full bg-emerald-100">
                  <path fill="#54b868" d="M16 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
                  <path fill="#388a47" d="M16 18c-7 0-12 4-12 9v1h24v-1c0-5-5-9-12-9z" />
                </svg>
              </div>
            </div>

          </div>
        </header>

        {/* ========================================================== */}
        {/* 3. DYNAMIC CONTENT DOCK */}
        {/* ========================================================== */}
        <div className="p-8 flex-1">
          
          {/* ========================================== */}
          {/* TAB 1: DASHBOARD VIEW */}
          {/* ========================================== */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left & Middle Column (col-span-9) */}
              <div className="xl:col-span-9 space-y-8">
                
                {/* Weather card row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Weather Cloud Card Widget (col-span-5) */}
                  <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 relative bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-zinc-950 text-white min-h-[300px] flex flex-col justify-between p-6">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl" />
                    
                    <div className="z-10 flex justify-between items-start">
                      <div>
                        <span className="text-[12px] tracking-wide uppercase font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">{t.today}, 13th of Dec</span>
                        <h3 className="text-4xl font-extrabold mt-4 tracking-tight">{formatTempFull(currentDetails.temp)}</h3>
                        <p className="text-emerald-400 font-bold text-[14px] mt-1 flex items-center gap-1.5">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          Cloudy
                        </p>
                      </div>
                      <CloudSun className="w-16 h-16 text-sky-400 animate-bounce animate-duration-3000" />
                    </div>

                    <div className="z-10 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-sky-400" />
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Wind Speed</p>
                          <p className="text-[13px] font-bold">6 km/h (NE)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-sky-400" />
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Humidity</p>
                          <p className="text-[13px] font-bold">32%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal 5-Day Forecast Grid (col-span-7) */}
                  <div className={`md:col-span-7 rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 flex flex-col justify-between shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-[15px] tracking-tight">{t.forecast}</h3>
                      <div className="flex gap-1.5">
                        <button className={`p-1.5 rounded-full border ${isDark ? "border-zinc-700 bg-zinc-800" : "border-gray-200 bg-white"} text-gray-400 hover:text-gray-900 transition-colors`}>
                          <ChevronLeft className="w-4.5 h-4.5" />
                        </button>
                        <button className={`p-1.5 rounded-full border ${isDark ? "border-zinc-700 bg-zinc-800" : "border-gray-200 bg-white"} text-gray-400 hover:text-gray-900 transition-colors`}>
                          <ChevronRight className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { day: "Fri, 13th", temp: 28, icon: Sun, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/10" },
                        { day: "Sat, 14th", temp: 27, icon: Sun, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/10" },
                        { day: "Sun, 15th", temp: 26, icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" },
                        { day: "Mon, 16th", temp: 23, icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" },
                        { day: "Tue, 17th", temp: 24, icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" }
                      ].map((fc, i) => {
                        const Icon = fc.icon;
                        return (
                          <div key={i} className={`p-3 rounded-xl border ${isDark ? "border-zinc-800/80 bg-zinc-800/20" : "border-gray-50 bg-gray-50/50"} flex flex-col items-center justify-between text-center min-h-[140px]`}>
                            <span className="text-[11px] font-bold text-gray-400 block">{fc.day}</span>
                            <div className={`p-2 rounded-full ${fc.bg} my-1.5`}>
                              <Icon className={`w-6 h-6 ${fc.color}`} />
                            </div>
                            <span className="text-[14px] font-bold">{formatTemp(fc.temp)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Street map + Air pollution DEFRA + App rides */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Street Map Widget (col-span-4) */}
                  <div className={`md:col-span-4 rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm flex flex-col justify-between min-h-[280px]`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-[14px] tracking-tight">{t.liveStreet}</h3>
                      <button onClick={() => setShowMapModal(true)} className="text-[11px] font-bold text-emerald-500 hover:underline font-sans">Full Map</button>
                    </div>

                    <div className="flex-1 rounded-xl overflow-hidden relative border border-gray-100 dark:border-zinc-800 bg-[#E8ECEF] dark:bg-zinc-800 flex items-center justify-center">
                      {/* Styled Simulated SVG Street Map */}
                      <svg className="w-full h-full opacity-70" viewBox="0 0 200 120">
                        {/* Land blocks */}
                        <rect x="0" y="0" width="200" height="120" fill={isDark ? "#2A2A2A" : "#F3F4F6"} />
                        <rect x="15" y="15" width="60" height="40" fill={isDark ? "#1A1A1A" : "#FFFFFF"} rx="4" />
                        <rect x="90" y="15" width="95" height="40" fill={isDark ? "#1A1A1A" : "#FFFFFF"} rx="4" />
                        <rect x="15" y="70" width="85" height="35" fill={isDark ? "#1A1A1A" : "#FFFFFF"} rx="4" />
                        {/* Roads */}
                        <path d="M 0 60 L 200 60" stroke={isDark ? "#3F3F46" : "#E2E8F0"} strokeWidth="16" />
                        <path d="M 80 0 L 80 120" stroke={isDark ? "#3F3F46" : "#E2E8F0"} strokeWidth="16" />
                        <path d="M 0 60 L 200 60" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4,4" />
                        <path d="M 80 0 L 80 120" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4,4" />
                        {/* Location Pin */}
                        <circle cx="80" cy="60" r="5" fill="#EF4444" />
                        <circle cx="80" cy="60" r="10" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-ping" />
                      </svg>
                      
                      <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
                        <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded shadow">Mirpur 10</span>
                        <div className="bg-black/60 backdrop-blur-sm p-1.5 rounded text-white flex justify-between items-center w-full">
                          <span className="text-[9px] font-bold">Speed: Avg 24 km/h</span>
                          <span className="text-[9px] text-amber-400 font-bold">Congested</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Air Pollution DEFRA Bar Chart (col-span-4) */}
                  <div className={`md:col-span-4 rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm flex flex-col justify-between min-h-[280px]`}>
                    <div>
                      <h3 className="font-bold text-[14px] tracking-tight">Air Pollution (DEFRA)</h3>
                      <p className={`text-[11px] ${isDark ? "text-zinc-500" : "text-gray-400"} mt-0.5`}>Current Index Indicators</p>
                    </div>

                    <div className="h-32 flex items-end justify-between px-4 my-2 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none border-b border-gray-100 dark:border-zinc-800">
                        {[100, 80, 60, 40, 20].map((gl) => (
                          <div key={gl} className="w-full flex items-center justify-between border-t border-gray-100/55 dark:border-zinc-800/35">
                            <span className="text-[8px] text-gray-400 font-semibold">{gl}</span>
                            <div className="flex-1 border-t border-dashed border-gray-100 dark:border-zinc-800/10 ml-2" />
                          </div>
                        ))}
                      </div>

                      {/* Dynamic vertical bars */}
                      <div className="flex flex-col items-center gap-1.5 z-10 w-8">
                        <div className="w-4 bg-emerald-450 rounded-t-sm transition-all duration-700" style={{ height: '70px' }} />
                        <span className="text-[9px] text-gray-400 font-bold">Ozone</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 z-10 w-8">
                        <div className="w-4 bg-amber-450 rounded-t-sm transition-all duration-700" style={{ height: '55px' }} />
                        <span className="text-[9px] text-gray-400 font-bold">NO2</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 z-10 w-8">
                        <div className="w-4 bg-red-450 rounded-t-sm transition-all duration-700" style={{ height: '85px' }} />
                        <span className="text-[9px] text-gray-400 font-bold">Dust</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-50 dark:border-zinc-800">
                      <span className="text-[10px] text-red-500 font-extrabold uppercase bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded block text-center">
                        Unhealthy 241
                      </span>
                    </div>
                  </div>

                  {/* App-Based Rides Circular Charts (col-span-4) */}
                  <div className={`md:col-span-4 rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm flex flex-col justify-between min-h-[280px]`}>
                    <div>
                      <h3 className="font-bold text-[14px] tracking-tight">App-Based Rides</h3>
                      <p className={`text-[11px] ${isDark ? "text-zinc-500" : "text-gray-400"} mt-0.5`}>Real-time Availability</p>
                    </div>

                    <div className="grid grid-cols-3 gap-1 py-2">
                      {[
                        { label: "Available", pct: 43, color: "text-emerald-500", stroke: "#10B981" },
                        { label: "Limited", pct: 71, color: "text-amber-500", stroke: "#F59E0B" },
                        { label: "Busy", pct: 86, color: "text-red-500", stroke: "#EF4444" }
                      ].map((gauge, i) => {
                        const radius = 24;
                        const circumference = 2 * Math.PI * radius;
                        const strokeDashoffset = circumference - (gauge.pct / 100) * circumference;
                        return (
                          <div key={i} className="flex flex-col items-center">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r={radius} fill="transparent" stroke={isDark ? "#2D2D30" : "#E5E7EB"} strokeWidth="5" />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r={radius}
                                  fill="transparent"
                                  stroke={gauge.stroke}
                                  strokeWidth="5"
                                  strokeDasharray={circumference}
                                  strokeDashoffset={strokeDashoffset}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-[12px] font-extrabold">{gauge.pct}%</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold mt-1.5 text-center block">{gauge.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-gray-50 dark:border-zinc-800 text-center">
                      <span className="text-[11px] text-emerald-500 font-bold block hover:underline cursor-pointer">
                        Book Ride Now →
                      </span>
                    </div>
                  </div>

                </div>

                {/* Transport Alerts table (short dashboard version) */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[15px] tracking-tight">{t.transportAlerts}</h3>
                    <button onClick={() => setActiveTab("transit")} className="text-[12px] text-emerald-500 font-bold hover:underline flex items-center gap-1">
                      <span>{t.seeDetails}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px]">
                      <thead>
                        <tr className={`border-b ${isDark ? "border-zinc-800 text-zinc-500" : "border-gray-100 text-gray-400"} font-bold`}>
                          <th className="pb-3 pr-4">Name</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
                        {transportAlertsList.slice(0, 5).map((alert, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                            <td className="py-3 font-semibold pr-4">{alert.name}</td>
                            <td className="py-3 text-right">
                              <span className="inline-flex items-center gap-1.5 font-bold">
                                <span className={`w-2.5 h-2.5 rounded-full ${
                                  alert.color === "green" ? "bg-emerald-500" : alert.color === "orange" ? "bg-amber-500" : "bg-red-500"
                                }`} />
                                <span className={
                                  alert.color === "green" ? "text-emerald-600" : alert.color === "orange" ? "text-amber-500" : "text-red-500"
                                }>{alert.status}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Right Column (col-span-3) */}
              <div className="xl:col-span-3 space-y-8">
                
                {/* News Area widget */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm`}>
                  <h3 className="font-bold text-[15px] tracking-tight mb-4">{t.latestInArea}</h3>
                  <div className="space-y-4">
                    {newsList.map((news) => (
                      <div
                        key={news.id}
                        onClick={() => setShowNewsModal(news.id)}
                        className={`rounded-xl overflow-hidden border ${isDark ? "border-zinc-800 bg-zinc-800/20" : "border-gray-100 bg-gray-50/30"} hover:border-emerald-500 transition-all cursor-pointer group`}
                      >
                        <div className="h-28 w-full relative flex items-end p-3" style={{ background: news.image }}>
                          <span className="absolute top-2 left-2 bg-black/60 text-white font-bold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {news.tag}
                          </span>
                          <h4 className="text-[12px] font-extrabold text-white leading-4 drop-shadow group-hover:underline">
                            {news.title}
                          </h4>
                        </div>
                        <div className="p-3">
                          <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"} line-clamp-2 leading-4`}>
                            {news.summary}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traffic Now Indicator widget */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm flex flex-col justify-between`}>
                  <div>
                    <h3 className="font-bold text-[14px] tracking-tight">{t.trafficNow}</h3>
                    <div className="flex gap-2.5 mt-2">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Light</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold"><span className="w-2 h-2 rounded-full bg-amber-500" /> Moderate</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold"><span className="w-2 h-2 rounded-full bg-red-500" /> Heavy</span>
                    </div>
                  </div>

                  <div className="my-6 text-center">
                    <div className="inline-flex flex-col items-center justify-center p-6 rounded-full bg-amber-50 dark:bg-amber-950/20 border-4 border-amber-400 animate-pulse">
                      <Activity className="w-8 h-8 text-amber-500" />
                      <span className="text-[14px] font-black text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-wider">Moderate</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-50 dark:border-zinc-800 text-center text-[10px] text-gray-400">
                    Calculated for central bypass zones.
                  </div>
                </div>

                {/* Live Street Camera feeds widget */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[14px] tracking-tight">{t.liveStreetCamera}</h3>
                    <button onClick={() => setActiveTab("livestreet")} className="text-[11px] font-bold text-emerald-500 hover:underline">{t.seeDetails}</button>
                  </div>

                  <div className="space-y-4">
                    {cameraFeeds.map((feed) => (
                      <div
                        key={feed.id}
                        onClick={() => setShowCameraModal(feed.id)}
                        className={`rounded-xl overflow-hidden border ${isDark ? "border-zinc-800 bg-zinc-800/20" : "border-gray-100 bg-gray-50/20"} hover:border-emerald-500 transition-all cursor-pointer relative group`}
                      >
                        {/* Interactive Canvas Traffic Animation */}
                        <div className="h-32 w-full bg-slate-900 overflow-hidden relative">
                          <canvas
                            ref={(el) => {
                              if (el) canvasRefs.current[feed.id] = el;
                            }}
                            width="300"
                            height="128"
                            className="w-full h-full block object-cover"
                          />
                          
                          {/* Live Dot Overlay */}
                          <div className="absolute top-2 left-2 bg-red-600 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded flex items-center gap-1 select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            <span>{t.liveLabel}</span>
                          </div>

                          {/* Hover Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/50 text-white transform scale-90 group-hover:scale-100 transition-transform">
                              <Maximize2 className="w-6 h-6" />
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-white dark:bg-[#1E1E1E] flex items-center justify-between">
                          <span className="text-[12px] font-bold">{feed.name}</span>
                          <Video className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================== */}
          {/* TAB 2: WEATHER VIEW */}
          {/* ========================================== */}
          {activeTab === "weather" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left and Middle Sections (col-span-8) */}
              <div className="xl:col-span-8 space-y-8">
                
                {/* Weather highlight block */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Today large weather cloudy banner */}
                  <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 relative bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-zinc-950 text-white min-h-[300px] flex flex-col justify-between p-6">
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#4CAF50]/15 rounded-full blur-3xl" />
                    
                    <div className="z-10 flex justify-between items-start">
                      <div>
                        <span className="text-[11px] tracking-wide uppercase font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">{t.today}, 13th of Dec</span>
                        <h3 className="text-5xl font-black mt-5 tracking-tight">{currentDetails.temp}° Celsius</h3>
                        <p className="text-[#78D47E] font-bold text-[15px] mt-1.5 flex items-center gap-1.5">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#78D47E] animate-pulse" />
                          Cloudy
                        </p>
                      </div>
                      <CloudSun className="w-20 h-20 text-sky-400 animate-pulse" />
                    </div>

                    <div className="z-10 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Wind className="w-5 h-5 text-sky-400" />
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-extrabold">Wind</p>
                          <p className="text-[13px] font-bold">6 km/h</p>
                          <p className="text-[10px] text-zinc-500">Hum | 32%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-sky-400" />
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-extrabold">Atmosphere</p>
                          <p className="text-[13px] font-bold">Mild haze</p>
                          <p className="text-[10px] text-zinc-500">PM2.5 | {currentDetails.pm25}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5-Day Forecast Grid */}
                  <div className={`md:col-span-7 rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 flex flex-col justify-between shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-[15px] tracking-tight">{t.forecast}</h3>
                      <div className="flex gap-1.5">
                        <button className={`p-1.5 rounded-full border ${isDark ? "border-zinc-700 bg-zinc-800" : "border-gray-200 bg-white"} text-gray-400 hover:text-gray-900 transition-colors`}>
                          <ChevronLeft className="w-4.5 h-4.5" />
                        </button>
                        <button className={`p-1.5 rounded-full border ${isDark ? "border-zinc-700 bg-zinc-800" : "border-gray-200 bg-white"} text-gray-400 hover:text-gray-900 transition-colors`}>
                          <ChevronRight className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { day: "Fri, 13th", temp: "28° C", icon: Sun, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/10" },
                        { day: "Sat, 14th", temp: "27° C", icon: Sun, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/10" },
                        { day: "Sun, 15th", temp: "26° C", icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" },
                        { day: "Mon, 16th", temp: "23° C", icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" },
                        { day: "Tue, 17th", temp: "24° C", icon: CloudSun, color: "text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/10" }
                      ].map((fc, i) => {
                        const Icon = fc.icon;
                        return (
                          <div key={i} className={`p-3 rounded-xl border ${isDark ? "border-zinc-800/80 bg-zinc-800/20" : "border-gray-50 bg-gray-50/50"} flex flex-col items-center justify-between text-center min-h-[140px]`}>
                            <span className="text-[11px] font-bold text-gray-400 block">{fc.day}</span>
                            <div className={`p-2 rounded-full ${fc.bg} my-1.5`}>
                              <Icon className={`w-6 h-6 ${fc.color}`} />
                            </div>
                            <span className="text-[14px] font-bold">{fc.temp}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Hourly details widget */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                  <h3 className="font-bold text-[15px] tracking-tight mb-4">{t.hourlyForecast}</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { time: "Now", temp: "19°", icon: Moon, color: "text-indigo-400", hum: "32%", wind: "NE 5 kmph" },
                      { time: "2 a.m.", temp: "18°", icon: CloudSun, color: "text-sky-400", hum: "35%", wind: "NE 6 kmph" },
                      { time: "3 a.m.", temp: "16°", icon: CloudSun, color: "text-sky-400", hum: "37%", wind: "NE 8 kmph" },
                      { time: "4 a.m.", temp: "13°", icon: Moon, color: "text-indigo-400", hum: "38%", wind: "NE 7 kmph" }
                    ].map((hr, idx) => {
                      const Icon = hr.icon;
                      return (
                        <div key={idx} className={`p-4 rounded-xl border ${isDark ? "border-zinc-850 bg-zinc-900/10" : "border-gray-100 bg-gray-50/20"} flex flex-col justify-between items-center text-center space-y-2`}>
                          <span className="text-[12px] font-extrabold text-gray-400">{hr.time}</span>
                          <Icon className={`w-8 h-8 ${hr.color} animate-pulse`} />
                          <span className="text-xl font-bold">{hr.temp}</span>
                          <div className="flex flex-col gap-0.5 text-[11px] text-gray-500 mt-1">
                            <span className="flex items-center gap-1 justify-center font-sans"><Droplets className="w-3 h-3 text-sky-400" /> {hr.hum}</span>
                            <span className="flex items-center gap-1 justify-center font-sans"><Wind className="w-3 h-3 text-sky-400" /> {hr.wind}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Temperature map, Weather details list & Satellite */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Interactive Temperature Map (col-span-6) */}
                  <div className={`md:col-span-6 rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm flex flex-col justify-between min-h-[350px]`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-[14px] tracking-tight">{t.temperatureMap}</h3>
                      <div className="flex gap-1">
                        <button className={`p-1 rounded ${isDark ? "bg-zinc-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}><Plus className="w-3.5 h-3.5" /></button>
                        <button className={`p-1 rounded ${isDark ? "bg-zinc-800 text-gray-200" : "bg-gray-100 text-gray-700"}`}><Minus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="flex-1 rounded-xl overflow-hidden relative border border-[#E9D558]/30 bg-[#F4DF77]/25 flex items-center justify-center">
                      {/* Styled Simulated SVGA Temperature Map (Yellowish hue) */}
                      <svg className="w-full h-full opacity-65" viewBox="0 0 200 150">
                        <rect x="0" y="0" width="200" height="150" fill="#EAB308" opacity="0.15" />
                        {/* Map outline segments */}
                        <path d="M10,20 Q50,40 100,20 T190,50 L180,120 Q110,140 70,110 Z" fill="#EAB308" opacity="0.3" stroke="#CA8A04" strokeWidth="1.5" />
                        <path d="M60,60 Q100,70 120,110 T160,130" fill="none" stroke="#A16207" strokeWidth="1" strokeDasharray="3,3" />
                        
                        {/* Temperatures nodes */}
                        <text x="35" y="38" fill="#854D0E" fontSize="9" fontWeight="bold">Savar</text>
                        <text x="35" y="47" fill="#A16207" fontSize="8">15°</text>

                        <text x="100" y="75" fill="#854D0E" fontSize="10" fontWeight="extrabold">Dhaka</text>
                        <text x="100" y="86" fill="#A16207" fontSize="9" fontWeight="bold">18°</text>

                        <text x="145" y="115" fill="#854D0E" fontSize="9" fontWeight="bold">Narayanganj</text>
                        <text x="145" y="124" fill="#A16207" fontSize="8">18°</text>
                      </svg>
                      
                      {/* Interactive range bar */}
                      <div className="absolute bottom-3 inset-x-3 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-white flex flex-col gap-1 pointer-events-none">
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-green-400 via-yellow-400 to-red-500 rounded-full" />
                        <div className="flex justify-between text-[9px] font-bold text-gray-300">
                          <span>-20°C</span>
                          <span>-10°</span>
                          <span>0°</span>
                          <span>10°</span>
                          <span>20°</span>
                          <span>30°</span>
                          <span>40°</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weather list details + Satellite image card (col-span-6) */}
                  <div className="md:col-span-6 space-y-6">
                    
                    {/* Weather detailed data grid */}
                    <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm`}>
                      <h4 className="font-bold text-[13px] uppercase tracking-wide text-gray-400 mb-3">
                        {t.weatherToday} {location}
                      </h4>
                      <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-[13px] font-medium">
                        <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                          <span className="text-gray-400">{t.feelsLike}</span>
                          <span className="font-bold">{currentDetails.feelsLike}° C</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                          <span className="text-gray-400">{t.uvIndex}</span>
                          <span className="font-bold">0</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                          <span className="text-gray-400">{t.wind}</span>
                          <span className="font-bold">NE 5kmph</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                          <span className="text-gray-400">{t.visibility}</span>
                          <span className="font-bold">1 km</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                          <span className="text-gray-400">{t.humidity}</span>
                          <span className="font-bold">32%</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50 dark:border-zinc-800">
                          <span className="text-gray-400">{t.airQuality}</span>
                          <span className="font-bold">201</span>
                        </div>
                      </div>
                    </div>

                    {/* Satellite card */}
                    <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-4 shadow-sm flex flex-col justify-between`}>
                      <h4 className="font-bold text-[13px] tracking-tight mb-2">{t.satellite}</h4>
                      <div className="h-32 rounded-xl overflow-hidden bg-emerald-950/40 relative border border-emerald-900/20">
                        {/* Satellite simulated map */}
                        <svg className="w-full h-full opacity-60" viewBox="0 0 200 100">
                          <path d="M 0,20 Q 30,50 80,40 T 200,60" fill="none" stroke="#22D3EE" strokeWidth="6" />
                          <path d="M 40,0 Q 60,30 90,90" fill="none" stroke="#22D3EE" strokeWidth="4" />
                          {/* Green lands */}
                          <rect x="10" y="5" width="25" height="15" fill="#047857" opacity="0.3" rx="2" />
                          <rect x="110" y="10" width="40" height="25" fill="#047857" opacity="0.3" rx="2" />
                          <rect x="130" y="70" width="55" height="20" fill="#047857" opacity="0.3" rx="2" />
                        </svg>
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                          <span className="text-[10px] bg-black/60 text-white font-mono px-2 py-0.5 rounded">Sat Infra: Live</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* Right Column Section (col-span-4) */}
              <div className="xl:col-span-4 space-y-8">
                
                {/* Sunset / Sunrise stars card */}
                <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-800 relative bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-zinc-950 text-white p-6 flex flex-col justify-between min-h-[160px]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent pointer-events-none" />
                  <div className="z-10 flex justify-between items-center">
                    <h3 className="font-bold text-[14px] text-gray-400">Sun Cycle</h3>
                    <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
                  </div>
                  
                  <div className="z-10 grid grid-cols-2 gap-4 mt-6">
                    <div className="border-r border-white/10 pr-2">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{t.sunset}</p>
                      <p className="text-lg font-black text-amber-300">5:15 p.m.</p>
                    </div>
                    <div className="pl-2">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{t.sunrise}</p>
                      <p className="text-lg font-black text-sky-300">6:35 a.m.</p>
                    </div>
                  </div>
                </div>

                {/* Waterlogging Risk gradient slide */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm space-y-4`}>
                  <div>
                    <h3 className="font-bold text-[14px] tracking-tight">{t.waterloggingRisk}</h3>
                    <div className="flex gap-2.5 mt-2">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold"><span className="w-2 h-2 rounded-full bg-amber-500" /> Moderate</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold"><span className="w-2 h-2 rounded-full bg-red-500" /> Heavy</span>
                    </div>
                  </div>

                  <div className="relative pt-4">
                    {/* Gradient Bar */}
                    <div className="h-6 w-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 rounded-lg" />
                    
                    {/* Slider pin Indicator */}
                    <div className="absolute top-1/2 left-[73%] transform -translate-x-1/2 flex flex-col items-center">
                      <div className="w-3 h-3 bg-white border border-red-500 rounded-full shadow" />
                      <span className="bg-red-500 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                        💧 {currentDetails.waterloggingRisk}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Today's Air Quality in Mirpur 10 */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm space-y-5`}>
                  <div>
                    <h3 className="font-extrabold text-[15px] tracking-tight">Today's Air Quality in {location}</h3>
                    <h4 className="text-lg font-black text-red-500 mt-2">Unhealthy {currentDetails.aqi}</h4>
                    <p className={`text-[12px] leading-5 ${isDark ? "text-gray-400" : "text-gray-505"} mt-1`}>
                      {t.maskWarning}
                    </p>
                  </div>

                  {/* Range indicator slider */}
                  <div className="relative py-2">
                    <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-yellow-400 via-orange-400 to-red-600 rounded-full" />
                    <div className="absolute top-0.5 left-[75%] w-3 h-3 bg-red-500 rounded-full border border-white shadow" />
                  </div>

                  <div className="border-t border-gray-50 dark:border-zinc-800 pt-4">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{t.primaryPollutant}</p>
                    <p className="text-[13px] font-bold mt-1 text-slate-700 dark:text-gray-200">
                      PM2.5 (Particulate matter less than 2.5 microns)
                    </p>
                  </div>

                  {/* Circular sub-pollutants indicators */}
                  <div className="border-t border-gray-50 dark:border-zinc-800 pt-4">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-3">{t.allPollutants}</p>
                    
                    <div className="space-y-3">
                      {[
                        { label: "NO2 (Nitrogen Dioxide)", val: 10, max: 100, col: "text-emerald-500", stroke: "#10B981" },
                        { label: "O3 (Ozone)", val: 20, max: 100, col: "text-emerald-500", stroke: "#10B981" },
                        { label: "SO2 (Sulphur Dioxide)", val: 50, max: 100, col: "text-amber-500", stroke: "#F59E0B" }
                      ].map((pol, i) => {
                        const radius = 14;
                        const circ = 2 * Math.PI * radius;
                        const offset = circ - (pol.val / pol.max) * circ;
                        return (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">{pol.label}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-[11px] font-extrabold ${pol.col}`}>{pol.val} AQI</span>
                              <div className="w-8 h-8 relative flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="16" cy="16" r={radius} fill="transparent" stroke={isDark ? "#2D2D30" : "#F3F4F6"} strokeWidth="3" />
                                  <circle
                                    cx="16"
                                    cy="16"
                                    r={radius}
                                    fill="transparent"
                                    stroke={pol.stroke}
                                    strokeWidth="3"
                                    strokeDasharray={circ}
                                    strokeDashoffset={offset}
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================== */}
          {/* TAB 3: TRANSIT VIEW */}
          {/* ========================================== */}
          {activeTab === "transit" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left Column - Transport Alerts table (col-span-7) */}
              <div className={`xl:col-span-7 rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm flex flex-col justify-between`}>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-extrabold text-lg tracking-tight">{t.transportAlerts}</h3>
                      <p className={`text-[12px] ${isDark ? "text-zinc-500" : "text-gray-400"} mt-0.5`}>Real-time status of routes and checkpoints</p>
                    </div>

                    {/* Filter buttons & Search */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder={t.searchPlaceholder}
                          value={alertsSearch}
                          onChange={(e) => setAlertsSearch(e.target.value)}
                          className={`pl-9 pr-4 py-1.5 rounded-full border text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                            isDark
                              ? "bg-zinc-800 border-zinc-700 text-gray-200"
                              : "bg-white border-gray-300 text-gray-700"
                          }`}
                        />
                      </div>
                      <select
                        value={alertsFilter}
                        onChange={(e) => setAlertsFilter(e.target.value)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                          isDark
                            ? "bg-zinc-800 border-zinc-700 text-gray-200"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        <option value="all">All</option>
                        <option value="good">Good Service</option>
                        <option value="minor">Minor Delays</option>
                        <option value="major">Major Delays</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4 text-xs font-bold border-b pb-3 border-gray-50 dark:border-zinc-800">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.goodService}</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> {t.minorDelays}</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> {t.majorDelays}</span>
                  </div>

                  {/* List Container with scroll */}
                  <div className="max-h-[600px] overflow-y-auto pr-2 divide-y divide-gray-50 dark:divide-zinc-800">
                    {filteredAlerts.length > 0 ? (
                      filteredAlerts.map((alert, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3.5 hover:bg-gray-50/50 dark:hover:bg-zinc-800/10 transition-colors">
                          <span className="text-[13px] font-bold">{alert.name}</span>
                          <span className="inline-flex items-center gap-1.5 font-bold text-[13px]">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              alert.color === "green" ? "bg-emerald-500" : alert.color === "orange" ? "bg-amber-500" : "bg-red-500"
                            }`} />
                            <span className={
                              alert.color === "green" ? "text-emerald-600" : alert.color === "orange" ? "text-amber-500" : "text-red-500"
                            }>{alert.status}</span>
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400 font-semibold">No routes match the search criteria.</div>
                    )}
                  </div>
                </div>

                <div className={`mt-6 pt-4 border-t ${isDark ? "border-zinc-800" : "border-gray-50"} text-center`}>
                  <p className="text-[11px] text-gray-400">Transit data refreshed every 60 seconds.</p>
                </div>
              </div>

              {/* Right Column (col-span-5) */}
              <div className="xl:col-span-5 space-y-8">
                
                {/* Bus Routes Status Grid */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm`}>
                  <h3 className="font-extrabold text-[15px] tracking-tight mb-2">{t.busRoutesStatus}</h3>
                  <div className="flex gap-2.5 mb-4 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {t.onTime}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> {t.delayed}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> {t.disrupted}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-y-4 gap-x-2 border-t pt-4 border-gray-50 dark:border-zinc-800">
                    {busRoutesStatus.map((route, i) => (
                      <div key={i} className="flex items-center justify-between pr-2 border-r last:border-0 border-gray-100 dark:border-zinc-800">
                        <span className="text-[12px] font-bold truncate max-w-[80px]">{route.name}</span>
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ml-1 ${
                          route.color === "green" ? "bg-emerald-500" : route.color === "orange" ? "bg-amber-500" : "bg-red-500"
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metro Rail Status */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm`}>
                  <h3 className="font-extrabold text-[15px] tracking-tight mb-2">{t.metroRailStatus}</h3>
                  <div className="flex gap-2.5 mb-5 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {t.inStation}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> {t.onWay}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> {t.farAway}</span>
                  </div>

                  {/* Visual Metro Tracks */}
                  <div className="space-y-6">
                    
                    {/* Track 1: Towards Uttara North */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                        <span>{t.towardsUttara}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      
                      {/* Horizontal progress representation */}
                      <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full relative flex items-center">
                        <div className="absolute left-0 w-1/4 h-full bg-red-500 rounded-l-full" />
                        <div className="absolute left-[35%] w-1/5 h-full bg-amber-500" />
                        <div className="absolute left-[70%] w-1/6 h-full bg-emerald-500" />
                        
                        {/* Indicators nodes (stations) */}
                        <div className="absolute left-[20%] w-2 h-2 rounded-full bg-white border-2 border-red-500 shadow transform -translate-y-1/2 top-1/2" />
                        <div className="absolute left-[45%] w-2 h-2 rounded-full bg-white border-2 border-amber-500 shadow transform -translate-y-1/2 top-1/2" />
                        <div className="absolute left-[78%] w-2 h-2 rounded-full bg-white border-2 border-emerald-500 shadow transform -translate-y-1/2 top-1/2" />
                      </div>
                    </div>

                    {/* Track 2: Towards Motijheel */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                        <span>{t.towardsMotijheel}</span>
                        <ArrowLeft className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      
                      {/* Horizontal progress representation */}
                      <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full relative flex items-center">
                        <div className="absolute left-[5%] w-1/6 h-full bg-red-500" />
                        <div className="absolute left-[30%] w-1/4 h-full bg-emerald-500" />
                        <div className="absolute left-[65%] w-1/5 h-full bg-amber-500" />
                        <div className="absolute left-[90%] w-[10%] h-full bg-red-500 rounded-r-full" />
                        
                        {/* Indicators nodes */}
                        <div className="absolute left-[12%] w-2 h-2 rounded-full bg-white border-2 border-red-500 shadow transform -translate-y-1/2 top-1/2" />
                        <div className="absolute left-[40%] w-2 h-2 rounded-full bg-white border-2 border-emerald-500 shadow transform -translate-y-1/2 top-1/2" />
                        <div className="absolute left-[75%] w-2 h-2 rounded-full bg-white border-2 border-amber-500 shadow transform -translate-y-1/2 top-1/2" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* CNG Availability circular dials */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm`}>
                  <h3 className="font-extrabold text-[15px] tracking-tight mb-2">{t.cngAvailability}</h3>
                  <div className="flex gap-2.5 mb-5 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {t.high}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> {t.moderate}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> {t.low}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { pct: currentDetails.cngAvailability.high, label: "High", stroke: "#10B981" },
                      { pct: currentDetails.cngAvailability.mod, label: "Moderate", stroke: "#F59E0B" },
                      { pct: currentDetails.cngAvailability.low, label: "Low", stroke: "#EF4444" }
                    ].map((gauge, i) => {
                      const radius = 24;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDashoffset = circumference - (gauge.pct / 100) * circumference;
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="32" cy="32" r={radius} fill="transparent" stroke={isDark ? "#2D2D30" : "#F3F4F6"} strokeWidth="5" />
                              <circle
                                cx="32"
                                cy="32"
                                r={radius}
                                fill="transparent"
                                stroke={gauge.stroke}
                                strokeWidth="5"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute text-[12px] font-extrabold">{gauge.pct}%</span>
                          </div>
                          <span className="text-[11px] text-gray-400 font-bold mt-1 text-center">{gauge.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rickshaw Availability circular dials */}
                <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-5 shadow-sm`}>
                  <h3 className="font-extrabold text-[15px] tracking-tight mb-2">{t.rickshawAvailability}</h3>
                  <div className="flex gap-2.5 mb-5 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {t.high}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> {t.moderate}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> {t.low}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { pct: currentDetails.rickshawAvailability.high, label: "High", stroke: "#10B981" },
                      { pct: currentDetails.rickshawAvailability.mod, label: "Moderate", stroke: "#F59E0B" },
                      { pct: currentDetails.rickshawAvailability.low, label: "Low", stroke: "#EF4444" }
                    ].map((gauge, i) => {
                      const radius = 24;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDashoffset = circumference - (gauge.pct / 100) * circumference;
                      return (
                        <div key={i} className="flex flex-col items-center">
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="32" cy="32" r={radius} fill="transparent" stroke={isDark ? "#2D2D30" : "#F3F4F6"} strokeWidth="5" />
                              <circle
                                cx="32"
                                cy="32"
                                r={radius}
                                fill="transparent"
                                stroke={gauge.stroke}
                                strokeWidth="5"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute text-[12px] font-extrabold">{gauge.pct}%</span>
                          </div>
                          <span className="text-[11px] text-gray-400 font-bold mt-1 text-center">{gauge.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================== */}
          {/* TAB 4: TRAFFIC DETAILS */}
          {/* ========================================== */}
          {activeTab === "traffic" && (
            <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-8 shadow-sm text-center max-w-2xl mx-auto space-y-6`}>
              <Activity className="w-16 h-16 text-[#78D47E] mx-auto animate-pulse" />
              <h3 className="text-2xl font-black">{t.traffic} - Real-time Analysis</h3>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Detailed grid and path visualization of key sectors across Dhaka metropolitan area. Currently showing active alerts and bypass lane speeds.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                {[
                  { sector: "Mirpur 10 Circle", speed: "12 km/h", status: "Critical", color: "text-red-500" },
                  { sector: "Rokeya Avenue", speed: "28 km/h", status: "Moderate", color: "text-amber-500" },
                  { sector: "Dhanmondi Road 27", speed: "34 km/h", status: "Fluid", color: "text-emerald-500" },
                  { sector: "Mohakhali Flyover", speed: "8 km/h", status: "Gridlock", color: "text-red-500" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${isDark ? "border-zinc-800 bg-zinc-900/10" : "border-gray-100 bg-gray-50/20"}`}>
                    <h4 className="text-[12px] text-gray-400 font-bold">{item.sector}</h4>
                    <p className="text-xl font-extrabold mt-2">{item.speed}</p>
                    <span className={`text-[11px] font-black uppercase mt-1 block ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button onClick={() => setShowMapModal(true)} className="px-6 py-2.5 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition-colors shadow">
                  Open Interactive Map
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 5: LIVE STREET FULL VIEWS */}
          {/* ========================================== */}
          {activeTab === "livestreet" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-extrabold">{t.liveStreetCamera}</h3>
                <p className={`text-[13px] ${isDark ? "text-zinc-500" : "text-gray-400"} mt-0.5`}>Real-time surveillance cameras for major road intersections</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                  { id: "mirpur10", name: "Mirpur 10 Circle Intersection" },
                  { id: "avenue5", name: "Avenue 5 Bypass Intersection" },
                  { id: "rokeya", name: "Begum Rokeya Avenue Southbound" }
                ].map((feed) => (
                  <div
                    key={feed.id}
                    onClick={() => setShowCameraModal(feed.id)}
                    className={`rounded-2xl overflow-hidden border ${isDark ? "border-zinc-800 bg-[#1E1E1E]" : "border-gray-200 bg-white"} shadow hover:border-emerald-500 transition-all cursor-pointer group`}
                  >
                    <div className="h-48 w-full bg-slate-950 relative overflow-hidden">
                      <canvas
                        ref={(el) => {
                          if (el) canvasRefs.current[feed.id] = el;
                        }}
                        width="400"
                        height="192"
                        className="w-full h-full block object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded flex items-center gap-1 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>{t.liveLabel}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="font-extrabold text-[14px]">{feed.name}</span>
                      <Video className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 6: NEWS & INFO LIST */}
          {/* ========================================== */}
          {activeTab === "news" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-extrabold">{t.newsInfo}</h3>
                <p className={`text-[13px] ${isDark ? "text-zinc-500" : "text-gray-400"} mt-0.5`}>City alerts, public announcements, and transport news</p>
              </div>

              <div className="space-y-6">
                {newsList.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => setShowNewsModal(news.id)}
                    className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow hover:border-[#78D47E] transition-all cursor-pointer flex flex-col md:flex-row gap-6`}
                  >
                    <div className="w-full md:w-48 h-32 rounded-xl flex-shrink-0 flex items-end p-4 relative" style={{ background: news.image }}>
                      <span className="absolute top-3 left-3 bg-black/60 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {news.tag}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-black hover:underline">{news.title}</h4>
                        <p className={`text-[13px] mt-2 leading-6 ${isDark ? "text-gray-400" : "text-gray-605"}`}>
                          {news.summary}
                        </p>
                      </div>
                      <span className="text-[12px] text-emerald-500 font-bold mt-4 md:mt-0">Read full coverage →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 7: SETTINGS FULL VIEW */}
          {/* ========================================== */}
          {activeTab === "settings" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Settings className={`w-7 h-7 text-indigo-500 animate-spin`} style={{ animationDuration: '8s' }} />
                <h2 className="text-2xl font-extrabold tracking-tight">{t.settings}</h2>
              </div>

              {/* General Settings */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm space-y-5`}>
                <h3 className="font-bold text-[15px] tracking-tight border-b pb-3 border-gray-100 dark:border-zinc-800">{t.settingsGeneral}</h3>

                {/* Temperature Unit */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[14px]">{t.settingsUnits}</p>
                    <p className={`text-[12px] mt-0.5 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>Currently showing: °{tempUnit}</p>
                  </div>
                  <div className={`flex rounded-lg border overflow-hidden ${isDark ? "border-zinc-700" : "border-gray-200"}`}>
                    {(["C", "F"] as const).map((unit) => (
                      <button
                        key={unit}
                        onClick={() => setTempUnit(unit)}
                        className={`px-4 py-1.5 text-[13px] font-bold transition-colors ${tempUnit === unit ? "bg-indigo-500 text-white" : isDark ? "bg-zinc-800 text-gray-400 hover:bg-zinc-700" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      >
                        °{unit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data Refresh Rate */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[14px]">{t.settingsRefresh}</p>
                    <p className={`text-[12px] mt-0.5 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>Every {refreshRate}s</p>
                  </div>
                  <div className={`flex rounded-lg border overflow-hidden ${isDark ? "border-zinc-700" : "border-gray-200"}`}>
                    {[5, 10, 15, 30].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRefreshRate(r)}
                        className={`px-3 py-1.5 text-[13px] font-bold transition-colors ${refreshRate === r ? "bg-indigo-500 text-white" : isDark ? "bg-zinc-800 text-gray-400 hover:bg-zinc-700" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      >
                        {r}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[14px]">Theme</p>
                    <p className={`text-[12px] mt-0.5 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>{isDark ? "Dark Mode" : "Light Mode"}</p>
                  </div>
                  <button onClick={() => setIsDark(!isDark)} className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 ${isDark ? "bg-indigo-500" : "bg-gray-200"}`}>
                    <span className={`inline-block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 mt-0.5 ${isDark ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              {/* Weather Settings */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm space-y-5`}>
                <h3 className="font-bold text-[15px] tracking-tight border-b pb-3 border-gray-100 dark:border-zinc-800">{t.settingsWeather}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[14px]">{t.settingsWeatherAlert}</p>
                    <p className={`text-[12px] mt-0.5 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>AQI, rain, and storm notifications</p>
                  </div>
                  <button onClick={() => setWeatherAlerts(!weatherAlerts)} className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 ${weatherAlerts ? "bg-emerald-500" : isDark ? "bg-zinc-700" : "bg-gray-200"}`}>
                    <span className={`inline-block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 mt-0.5 ${weatherAlerts ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              {/* Transit Settings */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm space-y-5`}>
                <h3 className="font-bold text-[15px] tracking-tight border-b pb-3 border-gray-100 dark:border-zinc-800">{t.settingsTransit}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[14px]">Preferred Routes</p>
                    <p className={`text-[12px] mt-0.5 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>{t.settingsPrefRoutes}</p>
                  </div>
                  <button onClick={() => setPreferredRoutes(!preferredRoutes)} className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 ${preferredRoutes ? "bg-emerald-500" : isDark ? "bg-zinc-700" : "bg-gray-200"}`}>
                    <span className={`inline-block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 mt-0.5 ${preferredRoutes ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              {/* Traffic Settings */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm space-y-5`}>
                <h3 className="font-bold text-[15px] tracking-tight border-b pb-3 border-gray-100 dark:border-zinc-800">{t.settingsTraffic}</h3>
                <div className="flex items-center justify-between">
                  <div><p className="font-semibold text-[14px]">{t.settingsTrafficAlert}</p></div>
                  <button onClick={() => setTrafficAlerts(!trafficAlerts)} className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 ${trafficAlerts ? "bg-emerald-500" : isDark ? "bg-zinc-700" : "bg-gray-200"}`}>
                    <span className={`inline-block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 mt-0.5 ${trafficAlerts ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="font-semibold text-[14px]">{t.settingsCongestionAlerts}</p></div>
                  <button onClick={() => setCongestionAlerts(!congestionAlerts)} className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 ${congestionAlerts ? "bg-emerald-500" : isDark ? "bg-zinc-700" : "bg-gray-200"}`}>
                    <span className={`inline-block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 mt-0.5 ${congestionAlerts ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>

              {/* News Settings */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm space-y-5`}>
                <h3 className="font-bold text-[15px] tracking-tight border-b pb-3 border-gray-100 dark:border-zinc-800">{t.settingsNews}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[14px]">Customized News Sources</p>
                    <p className={`text-[12px] mt-0.5 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>{t.settingsNewsSources}</p>
                  </div>
                  <button onClick={() => setNewsSources(!newsSources)} className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 ${newsSources ? "bg-emerald-500" : isDark ? "bg-zinc-700" : "bg-gray-200"}`}>
                    <span className={`inline-block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 mt-0.5 ${newsSources ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 8: SUPPORT FULL VIEW */}
          {/* ========================================== */}
          {activeTab === "support" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-7 h-7 text-indigo-500" />
                <h2 className="text-2xl font-extrabold tracking-tight">{t.support}</h2>
              </div>

              {/* FAQs */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                <h3 className="font-bold text-[15px] mb-4">{t.supportFaqs}</h3>
                <div className="space-y-2">
                  {[
                    { id: "q1", q: t.faqQ1, a: t.faqA1 },
                    { id: "q2", q: t.faqQ2, a: t.faqA2 },
                    { id: "q3", q: t.faqQ3, a: t.faqA3 },
                    { id: "q4", q: t.faqQ4, a: t.faqA4 },
                    { id: "q5", q: t.faqQ5, a: t.faqA5 },
                    { id: "q6", q: t.faqQ6, a: t.faqA6 },
                    { id: "q7", q: t.faqQ7, a: t.faqA7 },
                    { id: "q8", q: t.faqQ8, a: t.faqA8 },
                    { id: "q9", q: t.faqQ9, a: t.faqA9 },
                    { id: "q10", q: t.faqQ10, a: t.faqA10 },
                  ].map((faq) => (
                    <div key={faq.id} className={`rounded-xl border overflow-hidden ${isDark ? "border-zinc-800" : "border-gray-100"}`}>
                      <button
                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                        className={`w-full text-left px-4 py-3 flex justify-between items-center font-semibold text-[13px] transition-colors ${isDark ? "hover:bg-zinc-800/60" : "hover:bg-gray-50"}`}
                      >
                        <span>{faq.q}</span>
                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === faq.id ? "rotate-90" : ""}`} />
                      </button>
                      {openFaq === faq.id && (
                        <div className={`px-4 pb-4 text-[13px] leading-6 ${isDark ? "text-gray-400 bg-zinc-800/20" : "text-gray-600 bg-gray-50/50"}`}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                <h3 className="font-bold text-[15px] mb-4">{t.supportMessageUs}</h3>
                <div className="space-y-3">
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Name"
                    className={`w-full px-4 py-2.5 rounded-xl border text-[13px] outline-none focus:ring-2 focus:ring-indigo-500/40 transition ${isDark ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-zinc-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`}
                  />
                  <input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Email Address"
                    type="email"
                    className={`w-full px-4 py-2.5 rounded-xl border text-[13px] outline-none focus:ring-2 focus:ring-indigo-500/40 transition ${isDark ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-zinc-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`}
                  />
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder={t.supportDescribe}
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-xl border text-[13px] outline-none focus:ring-2 focus:ring-indigo-500/40 transition resize-none ${isDark ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-zinc-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`}
                  />
                  <button
                    onClick={() => { alert(t.messageSent); setContactName(""); setContactEmail(""); setContactMessage(""); }}
                    className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors text-[13px]"
                  >
                    {t.supportSend}
                  </button>
                </div>
              </div>

              {/* Feedback Form */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                <h3 className="font-bold text-[15px] mb-1">{t.supportFeedbackTitle}</h3>
                <p className={`text-[12px] mb-4 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>{t.supportFeedbackDesc}</p>
                <div className="space-y-3">
                  <input
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                    placeholder={t.supportSubject}
                    className={`w-full px-4 py-2.5 rounded-xl border text-[13px] outline-none focus:ring-2 focus:ring-emerald-500/40 transition ${isDark ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-zinc-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`}
                  />
                  <textarea
                    value={feedbackDesc}
                    onChange={(e) => setFeedbackDesc(e.target.value)}
                    placeholder={t.supportDescribe}
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-xl border text-[13px] outline-none focus:ring-2 focus:ring-emerald-500/40 transition resize-none ${isDark ? "bg-zinc-800 border-zinc-700 text-gray-200 placeholder-zinc-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`}
                  />
                  <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer transition ${isDark ? "bg-zinc-800 border-zinc-700" : "bg-gray-50 border-gray-200"}`} onClick={() => fileInputRef.current?.click()}>
                    <span className={`text-[13px] ${isDark ? "text-zinc-400" : "text-gray-500"}`}>{selectedFile ? selectedFile.name : t.supportUpload}</span>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                  </div>
                  <button
                    onClick={() => { alert(t.feedbackSent); setFeedbackSubject(""); setFeedbackDesc(""); setSelectedFile(null); }}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors text-[13px]"
                  >
                    {t.supportSubmitFeedback}
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                <h3 className="font-bold text-[15px] mb-2">{t.supportContactInfo}</h3>
                <p className={`text-[13px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>{t.contactDetails}</p>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 9: ABOUT FULL VIEW */}
          {/* ========================================== */}
          {activeTab === "about" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Info className="w-7 h-7 text-[#78D47E]" />
                <h2 className="text-2xl font-extrabold tracking-tight">{t.aboutTitle}</h2>
              </div>

              {/* Hero Banner */}
              <div className="rounded-2xl overflow-hidden relative min-h-[140px] flex items-center p-8 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-zinc-950 text-white shadow-md">
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="z-10">
                  <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2">UIUXpert Lab · Version 1.2.0 · 2026</p>
                  <h3 className="text-3xl font-black tracking-tight leading-tight">Dhaka City<br/><span className="text-[#78D47E]">Smart Dashboard</span></h3>
                </div>
              </div>

              {/* Mission */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                <h3 className="font-bold text-[15px] mb-3 text-emerald-500">{t.ourMission}</h3>
                <p className={`text-[13px] leading-7 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{t.missionContent}</p>
              </div>

              {/* Data Sources */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                <h3 className="font-bold text-[15px] mb-1 text-indigo-500">{t.dataSources}</h3>
                <p className={`text-[13px] mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t.dataSourcesContent}</p>
                <ul className="space-y-2">
                  {[t.ds1, t.ds2, t.ds3, t.ds4, t.ds5, t.ds6].map((src, i) => (
                    <li key={i} className={`flex items-start gap-2 text-[13px] ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                      {src}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                <h3 className="font-bold text-[15px] mb-3 text-amber-500">{t.theTeam}</h3>
                <p className={`text-[13px] mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t.theTeamContent}</p>
                <div className="space-y-4">
                  {[
                    { bio: t.farhanaBio, initials: "FK", color: "bg-emerald-500" },
                    { bio: t.mushfiqurBio, initials: "MS", color: "bg-indigo-500" },
                  ].map((member, i) => (
                    <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${isDark ? "border-zinc-800 bg-zinc-800/20" : "border-gray-100 bg-gray-50/50"}`}>
                      <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0`}>{member.initials}</div>
                      <p className={`text-[13px] leading-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className={`rounded-2xl border ${isDark ? "bg-[#1E1E1E] border-zinc-800" : "bg-white border-gray-200"} p-6 shadow-sm`}>
                <h3 className="font-bold text-[15px] mb-2 text-sky-500">{t.contactUs}</h3>
                <p className={`text-[13px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>{t.contactDetails}</p>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. MODALS & FLOATING DIALOGS */}
      {/* ========================================================================= */}
      
      {/* MODAL 1: DHAKA CITY MAP MODAL */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
          <div className={`w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border ${
            isDark ? "bg-[#1E1E1E] border-zinc-800 text-white" : "bg-white border-gray-200 text-gray-800"
          }`}>
            <div className={`p-4 border-b ${isDark ? "border-zinc-800" : "border-gray-150"} flex justify-between items-center`}>
              <div className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-indigo-500" />
                <h3 className="font-extrabold text-base">Dhaka City Interactive Transit Map</h3>
              </div>
              <button onClick={() => setShowMapModal(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Map Area */}
            <div className="h-[480px] bg-[#E8ECEF] dark:bg-zinc-900 relative overflow-hidden flex items-center justify-center p-6">
              {/* Complex SVG Dhaka Map Drawing with key nodes */}
              <svg className="w-full h-full opacity-80" viewBox="0 0 600 380">
                {/* Land masses */}
                <rect x="0" y="0" width="600" height="380" fill={isDark ? "#121212" : "#F3F4F6"} />
                {/* River Buriganga */}
                <path d="M 0,330 Q 150,320 280,350 T 600,320" fill="none" stroke="#22D3EE" strokeWidth="16" />
                {/* River Turag */}
                <path d="M 50,0 Q 80,150 120,250 T 280,350" fill="none" stroke="#22D3EE" strokeWidth="12" />
                
                {/* Major Roads Grid */}
                {/* Mirpur Road */}
                <path d="M 120,50 L 120,280 L 250,280 L 350,300" fill="none" stroke={isDark ? "#3F3F46" : "#E2E8F0"} strokeWidth="10" />
                {/* Rokeya Avenue */}
                <path d="M 200,50 L 200,200 L 250,280" fill="none" stroke={isDark ? "#3F3F46" : "#E2E8F0"} strokeWidth="8" />
                {/* Pragati Sarani */}
                <path d="M 400,40 L 400,250 L 350,300" fill="none" stroke={isDark ? "#3F3F46" : "#E2E8F0"} strokeWidth="8" />
                {/* Airport Road */}
                <path d="M 300,0 L 300,180 L 200,200" fill="none" stroke={isDark ? "#3F3F46" : "#E2E8F0"} strokeWidth="10" />
                
                {/* Transit Centerline */}
                <path d="M 120,50 L 120,280 L 250,280 L 350,300" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6,6" />
                <path d="M 300,0 L 300,180" fill="none" stroke="#EF4444" strokeWidth="2.5" />

                {/* City Nodes */}
                {[
                  { x: 120, y: 50, name: "Uttara", col: "#EF4444" },
                  { x: 120, y: 140, name: "Mirpur 10", col: "#10B981" },
                  { x: 200, y: 200, name: "Farmgate", col: "#F59E0B" },
                  { x: 250, y: 280, name: "Shahbagh", col: "#3B82F6" },
                  { x: 350, y: 300, name: "Motijheel", col: "#10B981" },
                  { x: 400, y: 110, name: "Gulshan 2", col: "#EF4444" }
                ].map((node, i) => (
                  <g key={i} className="cursor-pointer group">
                    <circle cx={node.x} cy={node.y} r="8" fill={node.col} />
                    <circle cx={node.x} cy={node.y} r="14" fill="none" stroke={node.col} strokeWidth="2" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <text x={node.x + 12} y={node.y + 4} fill={isDark ? "#FFFFFF" : "#1E293B"} fontSize="11" fontWeight="bold" className="drop-shadow">
                      {node.name}
                    </text>
                  </g>
                ))}
              </svg>

              <div className="absolute top-4 right-4 bg-black/75 backdrop-blur text-white p-4 rounded-xl space-y-2 text-xs">
                <h4 className="font-extrabold text-[13px] border-b border-white/10 pb-1.5 font-sans">Map Legend</h4>
                <div className="flex items-center gap-2 font-sans"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> <span>Good Transit Fluidity</span></div>
                <div className="flex items-center gap-2 font-sans"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> <span>Moderate Congestion</span></div>
                <div className="flex items-center gap-2 font-sans"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> <span>High Traffic/Incident</span></div>
              </div>
            </div>
            <div className={`p-4 border-t ${isDark ? "border-zinc-800 bg-zinc-900/40" : "border-gray-150 bg-gray-50/50"} text-center`}>
              <span className="text-[12px] text-gray-400">Hold Left Click to drag and pan across sectors.</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EMERGENCY NUMBERS MODAL */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
          <div className={`w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border ${
            isDark ? "bg-[#1E1E1E] border-zinc-800 text-white" : "bg-white border-gray-200 text-gray-800"
          }`}>
            <div className="p-5 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="font-extrabold text-[15px]">{t.emergencyTitle}</h3>
                  <p className={`text-[11px] ${isDark ? "text-zinc-500" : "text-gray-400"}`}>{t.emergencySubtitle}</p>
                </div>
              </div>
              <button onClick={() => setShowEmergencyModal(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto">
              {emergencyContacts.map((contact, idx) => {
                return (
                  <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${contact.color}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-white dark:bg-zinc-950/20 shadow-sm">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[14px]">{contact.service}</h4>
                        <p className="text-[11px] leading-4 opacity-80 mt-0.5">{contact.desc}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.number}`}
                      className="px-4 py-2 bg-white text-[13px] font-black border border-current rounded-full shadow-sm hover:scale-105 active:scale-95 transition-transform"
                    >
                      📞 {contact.number}
                    </a>
                  </div>
                );
              })}
            </div>
            
            <div className={`p-4 text-center border-t ${isDark ? "border-zinc-800 bg-zinc-900/30" : "border-gray-150 bg-gray-50/50"}`}>
              <span className="text-[11px] text-red-500 font-bold">Standard operator call rates may apply. Dial 999 for immediate toll-free police.</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SURVEILLANCE CAMERA CCTV FULLSCREEN VIEW */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all">
          <div className="w-full max-w-3xl bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 text-white">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#1E293B]">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">
                  {cameraFeeds.find((f) => f.id === showCameraModal)?.name || "Live Stream CCTV"}
                </h3>
              </div>
              <button onClick={() => setShowCameraModal(null)} className="p-1.5 rounded-full hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="aspect-video bg-black relative flex items-center justify-center">
              <canvas
                ref={(el) => {
                  if (el) canvasRefs.current[showCameraModal] = el;
                }}
                width="640"
                height="360"
                className="w-full h-full object-contain block"
              />

              <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded flex items-center gap-1 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>{t.liveLabel}</span>
              </div>
            </div>

            <div className="p-4 bg-[#1E293B] flex items-center justify-between text-xs text-gray-400">
              <span>Intersections Traffic Control Hub</span>
              <span>Codec: H.264 • Bitrate: 4.8 Mbps</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: NEWS ARTICLE DETAIL READ VIEW */}
      {showNewsModal !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
          <div className={`w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border ${
            isDark ? "bg-[#1E1E1E] border-zinc-800 text-white" : "bg-white border-gray-200 text-gray-800"
          }`}>
            {(() => {
              const article = newsList.find((n) => n.id === showNewsModal);
              if (!article) return null;
              return (
                <>
                  <div className="h-44 w-full relative flex items-end p-5" style={{ background: article.image }}>
                    <span className="absolute top-4 left-4 bg-black/60 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {article.tag}
                    </span>
                    <button
                      onClick={() => setShowNewsModal(null)}
                      className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/65 text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <h3 className="text-xl font-black text-white leading-6 drop-shadow">
                      {article.title}
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className={`text-[13px] leading-6 font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {article.full}
                    </p>
                    <p className={`text-[12px] leading-5 ${isDark ? "text-zinc-500" : "text-gray-400"}`}>
                      Reported by Dhaka Smart City Information Desk. Updates are logged directly via emergency transport frequencies.
                    </p>
                  </div>
                  <div className={`p-4 border-t ${isDark ? "border-zinc-800 bg-zinc-900/30" : "border-gray-150 bg-gray-50/50"} flex justify-between items-center text-xs`}>
                    <span className="text-gray-400">Published: Dec 13, 2024</span>
                    <button
                      onClick={() => setShowNewsModal(null)}
                      className="px-4 py-1.5 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Close Article
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}

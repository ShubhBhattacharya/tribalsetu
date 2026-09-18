// TribalSetu Universal Chatbot Knowledge Engine (TribalMitra AI)
// Covers all 22 Eighth Schedule Constitutional Languages of India + English + Major Tribal & Regional Languages (32 total)

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  speechCode: string;
  region: string;
}

export const ALL_INDIAN_LANGUAGES: SupportedLanguage[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN', region: 'राष्ट्रीय / उत्तर एवं मध्य भारत' },
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN', region: 'National / Official Associate' },
  { code: 'sat', name: 'Santali', nativeName: 'संथाली / ᱥᱟᱱᱛᱟᱲᱤ', speechCode: 'hi-IN', region: 'झारखंड, ओडिशा, बंगाल (जनजातीय)' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN', region: 'পশ্চিমবঙ্গ, ত্রিপুরা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN', region: 'ఆంధ్రప్రదేశ్, తెలంగాణ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN', region: 'महाराष्ट्र' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN', region: 'தமிழ்நாடு, புதுச்சேரி' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', speechCode: 'gu-IN', region: 'ગુજરાત' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', speechCode: 'ur-IN', region: 'قومی زبان' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN', region: 'ಕರ್ನಾಟಕ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechCode: 'ml-IN', region: 'കേരളം' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', speechCode: 'or-IN', region: 'ଓଡ଼ିଶା' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', speechCode: 'pa-IN', region: 'ਪੰਜਾਬ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', speechCode: 'as-IN', region: 'অসম' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', speechCode: 'hi-IN', region: 'मिथिला, बिहार, झारखंड' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो / बर\'', speechCode: 'as-IN', region: 'बोडोलैंड, असम (जनजातीय)' },
  { code: 'gon', name: 'Gondi', nativeName: 'गोंडी', speechCode: 'hi-IN', region: 'म.प्र., छत्तीसगढ़, महाराष्ट्र (जनजातीय)' },
  { code: 'bhl', name: 'Bhili', nativeName: 'भीली', speechCode: 'hi-IN', region: 'राजस्थान, गुजरात, म.प्र. (जनजातीय)' },
  { code: 'ho', name: 'Ho', nativeName: 'हो / ᱦᱳ', speechCode: 'hi-IN', region: 'झारखंड, ओडिशा (जनजातीय)' },
  { code: 'miz', name: 'Mizo', nativeName: 'Mizo ṭawng', speechCode: 'en-IN', region: 'Mizoram (North-East)' },
  { code: 'kha', name: 'Khasi', nativeName: 'Ka Ktien Khasi', speechCode: 'en-IN', region: 'Meghalaya (North-East)' },
  { code: 'gar', name: 'Garo', nativeName: 'A·chik', speechCode: 'en-IN', region: 'Meghalaya (North-East)' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্ / মণিপুরী', speechCode: 'bn-IN', region: 'মণিপুর' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर / کٲشُر', speechCode: 'ur-IN', region: 'جموں و کشمیر' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', speechCode: 'ne-NP', region: 'सिक्किम, दार्जिलिंग' },
  { code: 'sd', name: 'Sindhi', nativeName: 'सिन्धी / سنڌي', speechCode: 'hi-IN', region: 'राष्ट्रीय' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', speechCode: 'mr-IN', region: 'गोवा, कोंकण' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', speechCode: 'hi-IN', region: 'जम्मू' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', speechCode: 'hi-IN', region: 'शास्त्रीय भाषा' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', speechCode: 'hi-IN', region: 'बिहार, पूर्वांचल' },
  { code: 'chg', name: 'Chhattisgarhi', nativeName: 'छत्तीसगढ़ी', speechCode: 'hi-IN', region: 'छत्तीसगढ़' },
  { code: 'raj', name: 'Rajasthani', nativeName: 'राजस्थानी', speechCode: 'hi-IN', region: 'राजस्थान' }
];


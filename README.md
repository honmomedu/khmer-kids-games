# 🎮 KhmerKids Games - កម្មវិធីល្បែងសិក្សាកុមារបឋមសិក្សា 🇰🇭

កម្មវិធី Web App ល្បែងសិក្សាអប់រំកម្សាន្តសម្រាប់សិស្សបឋមសិក្សា (ថ្នាក់ទី ១ ដល់ ទី ៦) បង្កើតឡើងដោយ React, TypeScript, Tailwind CSS, Web Audio API, និង Canvas Confetti ត្រៀមរួចជាស្រេចសម្រាប់ Hosting លើ **Vercel**។

---

## 🌟 មាតិកាល្បែងសិក្សាទាំង ១០ App

### 📚 ផ្នែកភាសាខ្មែរ (Khmer Language)
1. **App 1: ដំណើរផ្សងព្រេងព្យញ្ជនៈ & ស្រៈ (Khmer Alphabet Safari)**
   - រៀនស្គាល់ព្យញ្ជនៈខ្មែរទាំង ៣៣ តួ (ក-អ) ជាមួយសំឡេងបញ្ចេញសំឡេង
   - ផ្គូផ្គងព្យញ្ជនៈទៅនឹងរូបភាព និងរៀនស្រៈនិស្ស័យ ២៣ តួ
2. **App 2: ល្បែងផ្សំប្រកបពាក្យខ្មែរ (Khmer Word Builder)**
   - តម្រៀបព្យញ្ជនៈ ស្រៈ និងជើងអក្សរ ផ្គុំបង្កើតជាពាក្យត្រឹមត្រូវតាមរូបភាព
3. **App 3: ឆ្លងស្ទឹងរើសពាក្យផ្ទុយ & ន័យដូច (Khmer Vocab River Crossing)**
   - ជួយកូនកង្កែបលោតឆ្លងស្លឹកឈូក ដោយរើសពាក្យផ្ទុយ និងពាក្យន័យដូច

### 🔢 ផ្នែកគណិតវិទ្យា (Mathematics)
4. **App 4: សួនសត្វរាប់លេខ & បូកដក (Jungle Math Adventure)**
   - រាប់ចំនួនសត្វក្នុងព្រៃ ដោយអាចចុចរាប់លើរូបភាព និងដោះស្រាយវិធីបូក ដក
5. **App 5: វាយប៉េងប៉ោងមេលេខគុណ (Multiplication Balloon Pop)**
   - ទន្ទេញមេលេខគុណ (មេ ២ ដល់ ៩ ឬលាយគ្នា) ចុចបាញ់ផ្ទុះប៉េងប៉ោងចម្លើយត្រូវ
6. **App 6: ជាងសំណង់រូបធរណីមាត្រ (Geometric Shape Builder)**
   - ស្គាល់រាងធរណីមាត្រ រាប់ជ្រុង រាប់កំពូល និងផ្គុំបំណែកបង្កើតជារូបផ្ទះ

### 🎡 ផ្នែកបង្វិលកង & អភិវឌ្ឍខួរក្បាល (Wheel Spinner & Brain Games)
7. **App 7: កងបង្វិលសំណួរមហាសំណាង (Lucky Educational Wheel)**
   - បង្វិលកងឆ្លើយសំណួរចៃដន្យ ឬប្ដូរទៅជា **Classroom Student Picker** សម្រាប់គ្រូបង្វិលហៅឈ្មោះសិស្សក្នុងថ្នាក់!
8. **App 8: កាតចងចាំផ្គូផ្គង (Memory Card Match)**
   - បើកផ្គូផ្គងរូបភាពជាមួយឈ្មោះសត្វ ឬផ្គូផ្គងប្រមាណវិធីលេខជាមួយចម្លើយ
9. **App 9: ប្រអប់អាថ៌កំបាំងសំណួររហ័ស (Mystery Box IQ Quiz)**
   - បើកប្រអប់លេខ ១ ដល់ ១២ ឆ្លើយសំណួរចំណេះដឹងទូទៅ និង IQ ប្រកួតជាមួយនាឡិកា
10. **App 10: ល្បែងចាត់ថ្នាក់ និងបែងចែកក្រុម (Smart Sorting Master)**
    - អូសទម្លាក់/ចាត់ថ្នាក់វត្ថុចូលធុងត្រឹមត្រូវ៖ សត្វគោក vs សត្វទឹក, លេខគូ vs លេខសេស, ផ្លែឈើ vs បន្លែ

---

## 🚀 របៀបដំណើរការលើម៉ាស៊ីនផ្ទាល់ខ្លួន (Local Development)

```bash
# ដំឡើង dependencies (បានដំឡើងរួចរាល់)
npm install

# បើក Local Dev Server
npm run dev
```

បើកកម្មវិធីមើលលើ Browser តាមរយៈ `http://localhost:5173`

---

## 🌐 របៀប Hosting លើ Vercel

### វិធីទី ១៖ តាមរយៈ GitHub & Vercel Dashboard (ងាយស្រួលបំផុត)
1. បង្កើត Repository មួយនៅលើ [GitHub](https://github.com/) រួច Push កូដទាំងអស់នេះឡើង
2. ចូលទៅកាន់ [vercel.com](https://vercel.com) ហើយ Login
3. ចុច **"Add New Project"** រួច Import Repository ពី GitHub
4. Vercel នឹងស្គាល់ Vite ដោយស្វ័យប្រវត្តិ (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`)
5. ចុច **Deploy** ជាការស្រេច!

### វិធីទី ២៖ តាមរយៈ Vercel CLI
```bash
# ដំឡើង vercel cli (បើមិនទាន់មាន)
npm i -g vercel

# ដំណើរការ deploy
vercel
```

---

## 🎨 ចំណុចពិសេសនៃ App នេះ
- **សំឡេង Web Audio API Synthesizer:** ដំណើរការបាន ១០០% គ្រប់ទីកន្លែង ដោយមិនបាច់ទាញយក file audio ពីក្រៅ
- **ចលនា & Confetti:** មានការបាញ់ផ្កាភ្ញី និងពិន្ទុផ្កាយ Stars ដែលរក្សាទុកក្នុង LocalStorage មិនបាត់បង់ពេល refresh
- **គាំទ្រ Smart TV & Tablet:** សមស្របបំផុតសម្រាប់គ្រូបង្រៀនបង្ហាញលើ Projector/Smart TV ក្នុងថ្នាក់រៀន

export const QUIZ_VERSION = 'v1';

const opt = (key, text, extra={}) => ({ key, value:key, text, ...extra });
const q = (id, order, category, dimension, title, options, extra={}) => ({
  id, order, category, dimension, title,
  desc: order <= 15 ? '選最接近你真實狀態的答案。' : '選最接近你想法的答案。',
  section: order <= 15 ? 'self' : 'expectation',
  type: 'single',
  active: true,
  options,
  ...extra
});

const commonSelf = {
  q02: q('q02',2,'生活作息','rhythm','你的日常作息比較接近哪一種？',[
    opt('A','固定早睡早起，生活節奏比較規律'),
    opt('B','大多正常，但偶爾會晚睡或作息變動'),
    opt('C','偏夜貓子，晚上比較有精神'),
    opt('D','作息很彈性，常常依工作或心情調整')
  ]),
  q03: q('q03',3,'休假頻率','schedule','你的休假和工作節奏比較接近哪一種？',[
    opt('A','週休二日為主，休假時間比較固定'),
    opt('B','排班制，休假不一定在週末'),
    opt('C','工作節奏比較忙，休假時間常常被壓縮'),
    opt('D','時間彈性大，可以自己安排工作和休息')
  ]),
  q04: q('q04',4,'抽菸習慣','smoking','你的抽菸習慣比較接近哪一種？',[
    opt('A','完全不抽菸'),
    opt('B','有固定抽紙菸的習慣'),
    opt('C','有固定抽電子菸或加熱菸的習慣'),
    opt('D','極少抽，例如聚會或壓力大時才抽'),
    opt('E','正在戒菸或希望慢慢減少')
  ]),
  q05: q('q05',5,'喝酒習慣','drinking','你的喝酒習慣比較接近哪一種？',[
    opt('A','幾乎不喝酒，也不太喜歡酒局'),
    opt('B','偶爾小酌，聚餐或放鬆時可以喝一點'),
    opt('C','因為工作或社交場合，偶爾需要喝酒'),
    opt('D','蠻喜歡喝酒，生活中喝酒的頻率算比較高'),
    opt('E','幾乎每天都會喝，人生怎麼能少了酒呢')
  ]),
  q07: q('q07',7,'飲食約會','dating_food','約會吃飯時，你比較偏好哪一種？',[
    opt('A','喜歡找有氣氛的餐廳，讓約會有一點儀式感'),
    opt('B','比起餐廳，更喜歡吃小吃、美食或在地店家'),
    opt('C','比較喜歡在家裡煮'),
    opt('D','餐廳、小吃、在家煮都可以，重點是跟對的人一起')
  ]),
  q08: q('q08',8,'交友觀','social_circle','你的朋友圈和社交狀態比較接近哪一種？',[
    opt('A','社交圈很活躍，常認識新朋友，也不排斥跟異性互動'),
    opt('B','朋友以同性為主，異性朋友比較少'),
    opt('C','異性朋友也不少，但會注意界線'),
    opt('D','朋友圈不大，主要跟少數熟人來往')
  ]),
  q09: q('q09',9,'社群公開','social_media','你平常和社群的關係比較接近哪一種？',[
    opt('A','喜歡公開分享生活，會透過社群記錄日常和近況'),
    opt('B','比較只和熟人分享，不太習慣把生活公開給很多人看'),
    opt('C','幾乎不太用社群，比起拍照分享，更喜歡活在當下'),
    opt('D','很重視真實生活，但偶爾也會公開分享一些重要或開心的時刻')
  ]),
  q10: q('q10',10,'房車經濟','assets_plan','你目前對房車和經濟規劃的狀態比較接近哪一種？',[
    opt('A','已經有房有車，也有比較穩定的經濟規劃'),
    opt('B','目前已有車、還沒有房，正在慢慢累積'),
    opt('C','目前沒有房或車，但會和另一半一起努力達成'),
    opt('D','現階段不把房車當成必要目標，更重視生活自由和彈性')
  ]),
  q11: q('q11',11,'金錢價值觀','money_values','你在感情裡的金錢價值觀比較接近哪一種？',[
    opt('A','平時可以 AA，但願意在平常或紀念日準備驚喜'),
    opt('B','堅持 AA 平分派，所有開銷習慣各付各的'),
    opt('C','情侶彼此互相，一起努力生活，不會特別算很清楚'),
    opt('D','希望對方在經濟上多照顧我'),
    opt('E','如果能力允許，願意負擔兩個人主要的開銷')
  ]),
  q13: q('q13',13,'儀式感','ritual','你對感情裡的節日和儀式感怎麼看？',[
    opt('A','很重視，重要節日一定希望好好安排、吃飯或準備禮物'),
    opt('B','喜歡有一點儀式感，不一定要盛大，但至少要有心'),
    opt('C','不太在意形式，只要兩個人感情穩定就好'),
    opt('D','比起固定節日，更喜歡平常生活裡自然的小驚喜')
  ]),
  q14: q('q14',14,'家庭界線','family_boundary','家人在你的生活和感情決定裡，通常扮演什麼角色？',[
    opt('A','家人的意見很重要，感情或重大決定通常會希望他們認同'),
    opt('B','會參考家人的想法，但最後還是以自己和伴侶的決定為主'),
    opt('C','家人比較少介入我的生活，感情和生活多半自己決定'),
    opt('D','和家裡比較不親近，或關係曾經比較緊張')
  ]),
  q15: q('q15',15,'個人空間','closeness','在感情裡，你對陪伴和個人空間的需求比較像哪一種？',[
    opt('A','需要每天聊天和見面，要黏在一起會比較安心'),
    opt('B','喜歡穩定陪伴，但也需要各自保有一些自己的時間'),
    opt('C','平常可以各忙各的，但重要時刻希望對方在身邊'),
    opt('D','很重視個人空間，不希望感情佔滿全部生活')
  ])
};

const commonExpect = {
  q17: q('q17',17,'作息接受度','rhythm_acceptance','如果對方的作息和你不太一樣，你的接受度最接近哪一種？',[
    opt('A','希望作息大致接近，差太多會影響相處'),
    opt('B','可以接受偶爾晚睡或作息變動，只要不要太失控'),
    opt('C','對方是夜貓子也可以，只要彼此有固定相處時間'),
    opt('D','對方作息很彈性也沒關係，各自生活能協調就好'),
    opt('E','不太在意作息差異，重點是相處品質',{neutral:true})
  ],{neutralOption:'E'}),
  q18: q('q18',18,'休假接受度','schedule_acceptance','如果對方休假時間和你不太一樣，你的接受度最接近哪一種？',[
    opt('A','希望休假時間大多能對上，才比較有時間經營感情'),
    opt('B','可以接受對方排班，只要能提前安排見面時間'),
    opt('C','可以接受對方工作忙，但希望重要時刻還是會留時間'),
    opt('D','對方時間彈性或不固定也沒關係，只要彼此願意協調'),
    opt('E','不太在意休假是否同步，各自有自己的生活也可以',{neutral:true})
  ],{neutralOption:'E'}),
  q19: q('q19',19,'抽菸接受度','smoking_acceptance','你對對方抽菸的接受度最接近哪一種？',[
    opt('A','完全不能接受對方抽菸',{hard:true}),
    opt('B','極少抽可以接受'),
    opt('C','抽電子菸或加熱菸可以接受，但紙菸不太行'),
    opt('D','有固定抽紙菸也可以，只要不影響我就好'),
    opt('E','如果對方正在戒菸或願意慢慢減少，我可以接受'),
    opt('F','不太在意對方是否抽菸',{neutral:true})
  ],{neutralOption:'F'}),
  q20: q('q20',20,'喝酒接受度','drinking_acceptance','你對對方喝酒習慣的接受度最接近哪一種？',[
    opt('A','希望對方幾乎不喝酒，也不太跑酒局'),
    opt('B','偶爾小酌或聚餐喝一點可以接受'),
    opt('C','因為工作或社交需要喝酒可以理解'),
    opt('D','蠻喜歡喝酒、頻率比較高也可以接受'),
    opt('E','每天喝酒可以接受，只要不影響生活就好'),
    opt('F','不太在意對方飲酒習慣',{neutral:true})
  ],{neutralOption:'F'}),
  q21: q('q21',21,'假日接受度','weekend_acceptance','你比較能接受對方的假日節奏是哪一種？',[
    opt('A','希望對方偏外出型，假日能一起安排活動、創造回憶'),
    opt('B','可以接受對方偏居家型，假日一起放鬆也很舒服'),
    opt('C','希望對方彈性一點，能依狀態在外出和休息之間切換'),
    opt('D','可以接受對方假日常有自己的安排，只要仍願意經營關係'),
    opt('E','不太在意假日節奏是否一致，彼此舒服最重要',{neutral:true})
  ],{neutralOption:'E'}),
  q22: q('q22',22,'飲食接受度','dating_food_acceptance','你比較能接受對方的約會飲食偏好是哪一種？',[
    opt('A','重視氣氛和儀式感，約會時希望有時能好好吃一餐'),
    opt('B','喜歡吃小吃、在地美食或比較輕鬆的店，不一定要正式餐廳'),
    opt('C','偏好在家料理或簡單吃，覺得生活感也很重要'),
    opt('D','吃什麼都可以，重點是和對的人一起',{neutral:true})
  ],{neutralOption:'D'}),
  q23: q('q23',23,'交友圈接受度','social_circle_acceptance','你對對方交友圈的接受度最接近哪一種？',[
    opt('A','希望對方交友圈單純，異性朋友不要太多'),
    opt('B','可以接受對方有一定異性朋友，但界線一定要清楚'),
    opt('C','可以接受對方社交圈活躍，偶爾會與異性出遊或參加活動'),
    opt('D','不太在意對方交友圈，只要彼此信任就好',{neutral:true})
  ],{neutralOption:'D'}),
  q24: q('q24',24,'房車經濟接受度','assets_acceptance','你希望對方目前的房車和經濟狀況比較接近哪一種？',[
    opt('A','希望對方已經有房有車，經濟狀況也比較穩定'),
    opt('B','可以接受目前有車、還沒有房，但有在慢慢累積'),
    opt('C','沒有房或車也可以，只要願意一起努力規劃未來'),
    opt('D','這題對我來說不想先設限，房車不是必要條件',{neutral:true})
  ],{neutralOption:'D'}),
  q25: q('q25',25,'溝通雷點','communication_dealbreaker','感情裡，你最不能接受哪種溝通狀態？',[
    opt('A','有問題都不說，長期冷戰或消失',{hard:true}),
    opt('B','情緒一上來就失控，完全不願意好好講',{hard:true}),
    opt('C','什麼都要講道理，但忽略感受'),
    opt('D','只想被安撫，卻不願意一起面對問題'),
    opt('E','這題對我來說不太重要，只要願意溝通都可以',{neutral:true})
  ],{neutralOption:'E'}),
  q26: q('q26',26,'修復節奏','repair_pace','吵架或不愉快之後，你比較能接受哪種修復節奏？',[
    opt('A','希望當天或很快就能處理，不喜歡拖太久'),
    opt('B','可以先冷靜一下，但希望之後能把話說開'),
    opt('C','不一定要馬上講清楚，只要彼此慢慢恢復就好'),
    opt('D','有時候時間過了就好，不一定每件事都要攤開談'),
    opt('E','這題對我來說不太重要，每段關係有自己的節奏',{neutral:true})
  ],{neutralOption:'E'}),
  q27: q('q27',27,'家庭期待','family_expectation','如果進入穩定關係，你比較希望家庭和你們的關係是？',[
    opt('A','兩邊家人可以自然往來，感情被家人認同會讓我更安心'),
    opt('B','可以和家人保持良好互動，但兩個人的事不希望被過度干涉'),
    opt('C','不太需要把家庭牽進感情裡，彼此相處穩定比較重要'),
    opt('D','這題對我來說不太重要，每個家庭都有自己的相處方式',{neutral:true})
  ],{neutralOption:'D'}),
  q28: q('q28',28,'身體親密','intimacy','你對感情裡身體親密的需求比較接近哪一種？',[
    opt('A','身體親密對我很重要，頻率高一點會更有連結感'),
    opt('B','身體親密是關係的一部分，但不需要太頻繁，彼此舒服就好'),
    opt('C','這方面需求比較低，更重視陪伴和情感穩定'),
    opt('D','這題對我來說不太重要，順其自然就好',{neutral:true})
  ],{neutralOption:'D'}),
  q29: q('q29',29,'婚姻小孩','future_family','你對婚姻和小孩的想法比較接近哪一種？',[
    opt('A','嚮往結婚，也希望未來有小孩'),
    opt('B','嚮往結婚，但不一定想要小孩'),
    opt('C','不嚮往婚姻或小孩，更想維持自由'),
    opt('D','曾經有婚姻經驗，現在對婚姻還在觀望'),
    opt('E','還沒有明確想法，會看遇到的人和關係狀態',{neutral:true})
  ],{neutralOption:'E'}),
  q30: q('q30',30,'使用目的','relationship_goal','你現在使用 Pengoo，最主要是想找到什麼樣的關係？',[
    opt('A','以結婚為前提，希望遇到能一起走向長期未來的人'),
    opt('B','想找穩定交往的對象，但不會一開始就預設婚姻'),
    opt('C','想先聊天、約會、看感覺，不急著確認關係'),
    opt('D','主要想拓展生活圈、交朋友，不一定要走向戀愛'),
    opt('E','這題對我來說不想先設限',{neutral:true})
  ],{neutralOption:'E'})
};

const male = [
  q('male_q01',1,'外型打理','appearance','你平常的外型打理比較像哪一種？',[
    opt('A','會特別整理髮型、穿搭和整體乾淨感，出門前會確認狀態'),
    opt('B','乾淨舒服最重要，不一定很打扮，但會保持清爽'),
    opt('C','看場合決定，重要約會或聚會才會特別整理'),
    opt('D','比較自然隨性，不太花時間打理外型')
  ]),
  commonSelf.q02, commonSelf.q03, commonSelf.q04, commonSelf.q05,
  q('male_q06',6,'假日安排','weekend','假日沒有特別安排時，你通常比較想怎麼過？',[
    opt('A','出門走走、吃飯、看展或安排約會'),
    opt('B','在家放鬆、追劇、打遊戲或補眠'),
    opt('C','一半一半，可以在家也可以出門，看當週狀態'),
    opt('D','假日通常也很忙，可能工作、進修或處理自己的事')
  ]),
  commonSelf.q07, commonSelf.q08, commonSelf.q09, commonSelf.q10, commonSelf.q11,
  q('male_q12',12,'感情溝通','communication','感情裡有不開心時，你通常比較像哪一種？',[
    opt('A','直球溝通，有問題希望當下講清楚'),
    opt('B','會先低頭安撫對方，關係比輸贏重要'),
    opt('C','習慣用邏輯和道理討論，希望把事情釐清'),
    opt('D','會先冷靜一下，再用比較穩定的狀態溝通'),
    opt('E','不太會說甜言蜜語，但會用行動表示在乎或道歉'),
    opt('F','容易先冷戰或沉默，等時間過了再看狀況')
  ]),
  commonSelf.q13, commonSelf.q14, commonSelf.q15,
  q('male_q16',16,'外型接受度','appearance_acceptance','對方平常比較自然、不太打扮，你的接受度最接近哪一種？',[
    opt('A','可以接受自然風格，但基本乾淨清爽還是很重要'),
    opt('B','平時自然風可以，但約會或重要場合希望會稍微打扮整理'),
    opt('C','我會比較在意外型打理，希望對方日常也有一定打扮及精緻度'),
    opt('D','不太在意外型或生活細節，只要相處起來舒服就好',{neutral:true})
  ],{neutralOption:'D'}),
  commonExpect.q17, commonExpect.q18, commonExpect.q19, commonExpect.q20,
  commonExpect.q21, commonExpect.q22, commonExpect.q23, commonExpect.q24,
  commonExpect.q25, commonExpect.q26, commonExpect.q27, commonExpect.q28,
  commonExpect.q29, commonExpect.q30
];

const female = [
  q('female_q01',1,'外型打理','appearance','你平常的外型打理比較像哪一種？',[
    opt('A','出門會認真整理妝髮、穿搭和整體狀態'),
    opt('B','乾淨舒服最重要，不一定化妝，但會保持清爽'),
    opt('C','看場合決定，重要約會或聚會才會特別打扮'),
    opt('D','比較自然隨性，不太花時間在外型打理上')
  ]),
  commonSelf.q02, commonSelf.q03, commonSelf.q04, commonSelf.q05,
  q('female_q06',6,'假日安排','weekend','假日沒有特別安排時，你通常比較想怎麼過？',[
    opt('A','出門走走、吃飯、看展或安排約會'),
    opt('B','在家放鬆、追劇或補眠'),
    opt('C','一半一半，可以在家也可以出門，看當週狀態'),
    opt('D','假日通常也很忙，可能工作、進修或處理自己的事')
  ]),
  commonSelf.q07, commonSelf.q08, commonSelf.q09, commonSelf.q10, commonSelf.q11,
  q('female_q12',12,'感情溝通','communication','感情裡有不開心時，你通常比較像哪一種？',[
    opt('A','直球溝通，有問題希望當下講清楚'),
    opt('B','會先低頭或是撒嬌安撫對方，關係比輸贏重要'),
    opt('C','習慣用邏輯和道理討論，希望把事情釐清'),
    opt('D','會先冷靜一下，再用比較穩定的狀態溝通'),
    opt('E','不太會撒嬌，但會用行動表示在乎或道歉'),
    opt('F','容易先冷戰或沉默，等時間過了再看狀況')
  ]),
  commonSelf.q13, commonSelf.q14, commonSelf.q15,
  q('female_q16',16,'外型穿搭接受度','appearance_acceptance','對方平常比較自然、不太打扮，你的接受度最接近哪一種？',[
    opt('A','不用特別打扮，但基本乾淨清爽和穿搭整齊很重要'),
    opt('B','平時自然風可以，但約會或重要場合希望會稍微打扮和整理穿搭'),
    opt('C','我會比較在意外型打理，希望對方日常也有一定穿搭和精緻度'),
    opt('D','不太在意外型、穿搭。相處舒服比較重要',{neutral:true})
  ],{neutralOption:'D'}),
  commonExpect.q17, commonExpect.q18, commonExpect.q19, commonExpect.q20,
  commonExpect.q21, commonExpect.q22, commonExpect.q23, commonExpect.q24,
  commonExpect.q25, commonExpect.q26, commonExpect.q27, commonExpect.q28,
  commonExpect.q29, commonExpect.q30
];

const other = [
  q('other_q01',1,'外型打理','appearance','你平常的外型打理比較像哪一種？',[
    opt('A','出門會認真整理髮型、穿搭和整體狀態'),
    opt('B','乾淨舒服最重要，不一定特別打扮，但會保持清爽'),
    opt('C','看場合決定，重要約會或聚會才會特別整理'),
    opt('D','比較自然隨性，不太花時間在外型打理上')
  ]),
  commonSelf.q02, commonSelf.q03, commonSelf.q04, commonSelf.q05,
  q('other_q06',6,'假日安排','weekend','假日沒有特別安排時，你通常比較想怎麼過？',[
    opt('A','出門走走、吃飯、看展或安排約會'),
    opt('B','在家放鬆、追劇或補眠'),
    opt('C','一半一半，可以在家也可以出門，看當週狀態'),
    opt('D','假日通常也很忙，可能工作、進修或處理自己的事')
  ]),
  commonSelf.q07,
  q('other_q08',8,'交友觀','social_circle','你的朋友圈和社交狀態比較接近哪一種？',[
    opt('A','社交圈很活躍，常認識新朋友，也不排斥跟不同類型的人互動'),
    opt('B','朋友多半是固定圈子，新的社交關係比較少'),
    opt('C','朋友類型不少，但會注意相處界線'),
    opt('D','朋友圈不大，主要跟少數熟人來往')
  ]),
  commonSelf.q09, commonSelf.q10, commonSelf.q11,
  q('other_q12',12,'感情溝通','communication','感情裡有不開心時，你通常比較像哪一種？',[
    opt('A','直球溝通，有問題希望當下講清楚'),
    opt('B','會先低頭或用自己的方式安撫對方，關係比輸贏重要'),
    opt('C','習慣用邏輯和道理討論，希望把事情釐清'),
    opt('D','會先冷靜一下，再用比較穩定的狀態溝通'),
    opt('E','不太會說甜言蜜語，但會用行動表示在乎或道歉'),
    opt('F','容易先冷戰或沉默，等時間過了再看狀況')
  ]),
  commonSelf.q13, commonSelf.q14, commonSelf.q15,
  q('other_q16',16,'外型穿搭接受度','appearance_acceptance','對方平常比較自然、不太打扮，你的接受度最接近哪一種？',[
    opt('A','不用特別打扮，但基本乾淨清爽和穿搭整齊很重要'),
    opt('B','平時自然風可以，但約會或重要場合希望會稍微打扮和整理穿搭'),
    opt('C','我會比較在意外型打理，希望對方日常也有一定穿搭和精緻度'),
    opt('D','不太在意外型、穿搭。相處舒服比較重要',{neutral:true})
  ],{neutralOption:'D'}),
  commonExpect.q17, commonExpect.q18, commonExpect.q19, commonExpect.q20,
  commonExpect.q21, commonExpect.q22, commonExpect.q23, commonExpect.q24,
  commonExpect.q25, commonExpect.q26, commonExpect.q27, commonExpect.q28,
  commonExpect.q29, commonExpect.q30
];

export const QUIZ_BANK = {
  version: QUIZ_VERSION,
  male,
  female,
  other
};

export function getQuizQuestions(gender){
  const key = gender === 'male' || gender === 'female' ? gender : 'other';
  return QUIZ_BANK[key]
    .filter(item => item.active !== false)
    .map(item => ({ ...item, options: item.options.map(option => ({ ...option })) }))
    .sort((a,b) => a.order - b.order);
}

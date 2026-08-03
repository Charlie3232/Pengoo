const BOT_SESSION_KEY = 'pengoo_dev_bot_uid';

export function getDevBotUid(){
  try{
    return sessionStorage.getItem(BOT_SESSION_KEY) || '';
  } catch(e){
    return '';
  }
}

export function setDevBotUid(uid){
  try{
    sessionStorage.setItem(BOT_SESSION_KEY, uid);
  } catch(e){}
}

export function clearDevBotUid(){
  try{
    sessionStorage.removeItem(BOT_SESSION_KEY);
  } catch(e){}
}

export async function resolveDevUser(authUser, db, doc, getDoc){
  const botUid = getDevBotUid();
  if(!botUid){
    return { user:authUser, data:null, isDevBot:false };
  }

  const botSnap = await getDoc(doc(db, 'users', botUid));
  if(!botSnap.exists()){
    clearDevBotUid();
    return { user:authUser, data:null, isDevBot:false };
  }

  const botData = botSnap.data();
  return {
    user:{
      uid:botUid,
      email:botData.email || `${botUid}@pengoo.test`,
      displayName:botData.nickname || botUid,
      realUid:authUser.uid,
      isDevBotSession:true
    },
    data:botData,
    isDevBot:true
  };
}

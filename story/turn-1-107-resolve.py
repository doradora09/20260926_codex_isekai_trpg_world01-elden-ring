from pathlib import Path
import json,copy,re,hashlib,datetime
p=Path(__file__).parent;r=Path('[local-path]');s=json.loads((r/'引き継ぎ状態.json').read_text());assert s['id']=='1-106';(p/'source-state.json').write_text(json.dumps(s,ensure_ascii=False,indent=2)+'\n');a=[s['teacher']]+s['loadouts'];by={x['name']:x for x in a};t=s['deployment']['missionTeams'];main=['私']+t['探索A隊']+t['探索B隊']
plan=[('私','片手剣',24),('森 健太','槍',18),('橘 陽太','槍',18),('石田 陸','君主軍の大剣',18),('水野 花','短弓',18),('木村 千夏','短弓',18),('藤井 悠','杖',18),('林 拓海','杖',15),('石川 紬','祈祷の触媒',12)]
condition={'scene':'1-107','day':97,'kind':'確定購入・整備・会話、戦闘なし','time':'06:00–11:30、当日午後と最終戦は未進行','authorization':'ユーザー承認：瓶強化→聖防護→大ルーン→防具配分と既存武器強化。資金の約9割を使用、最終戦前準備。','randomChecks':[],'reasonNoDice':'既取得品・解禁済み販売・熟練鍛冶・安全な教会での着用確認。成功を抽選する行動なし。新戦闘や狩猟成果を作らない。','upgradePlan':[{'name':n,'item':w,'to':v} for n,w,v in plan],'pricing':{'normalStone1to8':[20,40,60,90,120,150,240,360],'forgePerStep':60,'holyFortification':350,'runeArcEach':400,'arrowsEach':2,'repairPerItem':10,'armorFitPerPiece':10},'funding':'所持34742＋ホーラ・ルー追憶3000（原作30000の1/10）、黒き剣追憶は保持','plannedSpending':33800,'reserve':3942,'flask':'聖杯の雫1を先生専用瓶+0→+1、赤4青0容量不変。原作赤250→345参考、卓の次戦被害処理へ反映。全員に複製しない。','holy':'紬信27、火よ焼き尽くせを外し王たる聖防護/回復の2枠。共通3/青1=2補充維持。聖防護1消費/術者含む近傍最大6人/70秒/聖60%軽減参考。13人全員自動対象・物理軽減なし。原作範囲を人数へ抽象化した独自卓。','greatRune':'活性済ゴドリック1個を先生装備、弧2購入し1消費、予備1、店在庫5→3。一人の全8能力+5を一時補正として別管理、レベル/基礎値不変。死亡/外すと失効、効果重複なし。','armor':'異形竜：胴を陽太、手/足を健太、兜保管。百智：胴を陸、手を葵、足を紬、兜保管。元の制服は内衣、陽太旧上衣は保管。重量は原作を参考、既存HP/装備重量厳密計算未導入なので教会で走行回避し中量相当の動作を確認する卓裁定。防具数値/耐性新加算は次戦条件で明記、今勝利補正付与なし。','food':'DAY97の33人分を朝に先配給して62→29、同日午後/夜で重複消費しない。狩猟は未判定。','water':'午前簡略卓4L処理/4使用、開始終5。残り8L分は当日未処理。','ending':'勝利条件は既存契約維持。生存/復活済み全員帰還対象、期限100終了。メリナ復活は願望/女神への今後の照会のみ、原作通常ルートに復活手段があると捏造しない。失敗時の次世界具体作品・持越し・対象者は未確定。'}
(p/'conditions.json').write_text(json.dumps(condition,ensure_ascii=False,indent=2)+'\n');d={'scene':'1-107','conditionsSha256':hashlib.sha256((p/'conditions.json').read_bytes()).hexdigest(),'checks':[],'method':'抽選なし：確定在庫と固定価格による整備。次戦未抽選。','recordedAt':datetime.datetime.now().astimezone().isoformat()};(p/'all-dice.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
opening=bal=s['runeLedger']['balance'];income=spending=0;orders=[];materials={};repairs=[];armor=[]
def entry(label,v):
 global bal,income,spending
 bal+=v;income+=max(v,0);spending+=max(-v,0);s['runeLedger']['entries'].append({'scene':'1-107','day':97,'label':label,'delta':v,'balance':bal})
def item(id,name,q,status,holder='教会共同保管',**kw):
 v=dict(id=id,name=name,quantity=q,status=status,holder=holder,sourceScene='1-107',**kw);s['sharedInventory'].append(v);return v
x=next(x for x in s['sharedInventory'] if x['id']=='hoarah-loux-remembrance-106');assert x['quantity']==1;x.update(quantity=0,status='DAY97ルーン化。原作30000→卓3000を受領。武器/戦灰への交換なし。',consumedScene='1-107');entry('ホーラ・ルーの追憶をルーン化',3000)
for n,w,target in plan:
 e=next(e for e in by[n]['equipment'] if e['name']==w);start=e.get('upgradeLevel',0);used={};cost=0
 for level in range(start+1,target+1):
  tier=(level-1)//3+1;q=[2,4,6][(level-1)%3];used[tier]=used.get(tier,0)+q;materials[tier]=materials.get(tier,0)+q;cost+=q*condition['pricing']['normalStone1to8'][tier-1]
 fee=(target-start)*60;entry(n+' '+w+'鍛石購入',-cost);entry(n+' '+w+'強化工賃',-fee)
 e['upgradeLevel']=target;e.setdefault('upgradeHistory',[]).append({'scene':'1-107','day':97,'from':start,'to':target,'smith':'ヒューグ','cost':fee,'materials':used,'materialCost':cost,'system':'normal'});orders.append({'owner':n,'name':w,'from':start,'to':target,'materials':used,'materialCost':cost,'fee':fee})
 if isinstance(by[n]['gear'],list):by[n]['gear']=[re.sub(re.escape(w)+r'\s*\+\d+',w+' +'+str(target),g) for g in by[n]['gear']]
 else:by[n]['gear']=re.sub(re.escape(w)+r'\s*\+\d+',w+' +'+str(target),by[n]['gear'])
 by[n]['currentEquipmentNote']=f'DAY97 {w}+{target}。能力値/回数の増加なし。'
for tier,q in materials.items():item('normal-'+str(tier)+'-107',f'鍛石【{tier}】',0,f'DAY97{q}購入し全数消費。',purchaseQuantity=q,consumedQuantity=q,unitCost=condition['pricing']['normalStone1to8'][tier-1])
entry('王たる聖防護・円卓購入',-350);item('lords-divine-fortification-107','祈祷・王たる聖防護',1,'先生が円卓で購入し教会で紬へ伝授（既存卓方式）。信27、準備済み。','石川 紬',assigned=True)
x=by['石川 紬'];x.setdefault('knownIncantations',[]).append({'name':'王たる聖防護','faith':27,'known':True,'sourceScene':'1-107','cost':1});x['magic'].update(name='王たる聖防護／回復（共通3回）',prepared=['王たる聖防護','回復'],offensive=False,unpreparedNote='火よ焼き尽くせは習得保持、今回は外す。無料で戦闘中付け替えない。',holyFortification={'faithRequired':27,'costUses':1,'sharedPool':3,'nearbyTargetsMax':6,'includesCaster':True,'durationSeconds':70,'holyNegationReference':0.6,'scope':'聖属性のみ。盾で防げない物理/掴み/転倒を無効化しない。','tableAdaptation':'最大人数と回数は本卓。前衛優先、味方全33人へ効果なし。'});x['magic']['burnOFlame']['prepared']=False
entry('ルーンの弧2個（円卓在庫5→3）',-800);item('rune-arc-107','ルーンの弧',1,'2購入/先生1消費、再挑戦用1保管。',purchaseQuantity=2,consumedQuantity=1,unitCost=400,shopRemaining=3)
g=next(x for x in s['sharedInventory'] if x['id']=='godrick-great-rune-51');g.update(holder='私・装備',status='DAY97先生が装備しルーンの弧1使用。全能力+5の一時補正、死亡/外すと失効。',equippedBy='私',effectActive=True)
s['teacher']['greatRune']={'name':'ゴドリックの大ルーン','equipped':True,'active':True,'activatedScene':'1-107','arcConsumed':1,'attributeBonus':{k:5 for k in s['teacher']['stats']},'effectiveStats':{k:v+5 for k,v in s['teacher']['stats'].items()},'endsOn':['死亡','大ルーンを外す'],'note':'基礎能力/レベル不変。上乗せで瓶容量/卓の術回数は増やさない。'}
s['greatRune107']=copy.deepcopy(s['teacher']['greatRune'])
tear=next(x for x in s['sharedInventory'] if x['id']=='sacred-tear-88');assert tear['quantity']==1;tear.update(quantity=0,status='DAY97先生専用聖杯瓶の回復量+1に消費。容量4維持、全員への複製なし。',consumedScene='1-107')
s['teacher']['flasks'].update(upgradeLevel=1,potencyOwner='私',sacredTearUsedScene='1-107',redRecoveryReference={'from':250,'to':345,'note':'原作HP値参考。本卓の数値HPシステム導入ではない。次の被害判定で回復量増を考慮。'},note='赤4青0、回復量+1。回数/蘇生効果は増えない。');s['flaskRule'].update(sacredTearsOwned=0,individualUpgrades={'私':1},level=0,levelNote='共通基準0、先生のみ1。個人差はindividualUpgradesを参照。',usedThisScene=0)
entry('カーレから通常矢200本',-400)
for n,q in [('水野 花',100),('木村 千夏',100)]:by[n]['ammunition']['arrows']+=q
# Restore only the 15 items actually worn down in previous boss fight.
for w in s['battle106']['wear']:
 e=next(e for e in by[w['name']]['equipment'] if e['name']==w['item']);old=e['durability'];new=min(100,old+15);e['durability']=new;e['history'].append({'scene':'1-107','day':97,'before':old,'after':new,'delta':new-old,'loss':old-new,'cost':10,'reason':'最終戦前の補修。強化値とは別。'});entry(w['name']+' '+w['item']+'補修',-10);repairs.append({'name':w['name'],'item':w['item'],'from':old,'to':new,'cost':10})
# Split two existing sets into eight physical pieces; no duplicate full sets left available.
sets=[('malformed-dragon-set-98','異形の竜',[( '兜',None,6.8),('鎧','橘 陽太',16.0),('手甲','森 健太',5.3),('足甲','森 健太',9.9)]),('all-knowing-set-102','百智', [('兜',None,4.6),('鎧','石田 陸',10.7),('手甲','中村 葵',3.5),('足甲','石川 紬',6.6)])]
for setid,prefix,pieces in sets:
 old=next(x for x in s['sharedInventory'] if x['id']==setid);assert old['quantity']==1;old.update(quantity=0,status='DAY97四部位へ分割管理。各部位レコード参照、複製なし。',splitScene='1-107')
 for i,(part,owner,weight) in enumerate(pieces):
  name=prefix+'の'+part;id=setid+'-'+str(i);it=item(id,name,1,'前線へ配分済・防具に強化段階なし' if owner else '兜は重量/視界を優先し保管',owner or '教会共同保管',parentSet=setid,assigned=bool(owner),referenceWeight=weight)
  if owner:
   e={'id':id,'name':name,'category':'armor','durability':100,'maxDurability':100,'condition':'使用可','equipped':True,'appearance':'既得戦利品を体格に合わせて調整。落ちた細傷は残る。','referenceWeight':weight,'durabilityBasis':'未使用回収品の初点検100という卓基準。新規ドロップではない。','history':[],'sourceScene':'1-107'};by[owner]['equipment'].append(e);by[owner]['gear']+=' ／ '+name;by[owner]['armorAllocation']={'scene':'1-107','note':'教会で走行/屈伸/回避を確認。既存装備と併用し中量相当を維持する卓裁定。厳密重量総量は未モデル化。'};entry(owner+' '+name+'留め具調整',-10);armor.append({'owner':owner,'name':name,'weightReference':weight,'cost':10})
x=by['橘 陽太'];next(e for e in x['equipment'] if e['name']=='兵士の上衣')['equipped']=False;x['gear']=x['gear'].replace('兵士の上衣','旧兵士の上衣（教会保管）')
for it in s['sharedInventory']:
 if it.get('assigned'):
  for x in a:
   e=next((e for e in x['equipment'] if e['name']==it['name']),None)
   if e and x['name'] in str(it.get('holder','')):it.update(durability=e['durability'],upgradeLevel=e.get('upgradeLevel',0),status='DAY97配分/整備済み。現状は本人装備台帳を参照。')
 if it['id']=='jellyfish-ashes-63':it['status']='+1。DAY96第一王再戦で終盤まで陽動。毒未発症、次戦は1回/休息制。'
 if it['id']=='rold-medallion-84':it['status']='ロルドの大昇降機使用済み。共同保管。'
for x in a:
 x.update(location='エレの教会',condition='DAY97午前・最終戦準備完了、無傷');x['duty'].update(status='主力は出撃待機、C救援支援、基地生活守備',sourceScene='1-107')
 if x.get('flasks'):x['flasks'].update(usedThisScene=0,crimsonRemaining=x['flasks']['crimsonAllocated'],ceruleanRemaining=x['flasks'].get('ceruleanAllocated',0),remainingBeforeRest=x['flasks']['crimsonAllocated'])
 if x.get('magic'):x['magic'].update(usedThisScene=1 if x['name']=='石川 紬' else 0,remainingBeforeRest=x['magic']['maxUses']-(1 if x['name']=='石川 紬' else 0),remainingUses=x['magic']['maxUses'])
 if x.get('ammunition'):x['gear']=re.sub(r'携行矢\d+本',f"携行矢{x['ammunition']['arrows']}本",str(x['gear']));x['ranged']=f"通常矢{x['ammunition']['arrows']}本。"
 summary='最終二連戦前の装備整備と役割確認。' if x['name'] in main else '救援手順・物資仕分けを継続。新遠征なし。' if x['name'] in t['物資C隊'] else '朝食・取水・防衛当番。午後の狩猟はまだ未実施。'
 x.setdefault('recentRecordHistory',[]).append(copy.deepcopy(x.get('recentRecord',{})));x['recentRecord']={'scene':'1-107','day':97,'lastDay':97,'period':'DAY97午前','headline':summary,'detail':summary,'summary':summary,'sourceScene':'1-107'};x['currentFeeling']='帰れたあとに何をするか、言葉にしてみた。今は最後の準備をする。'
s.update(id='1-107',title='帰ったあとの話をしよう。',image='assets/final-preparation-day97-turn107.png',dice=d);s['worldTime'].update(day=97,hour=11,minute=30,phase='午前',startedThisTurn='DAY97 06:00',elapsedThisTurnMinutes=330,locationLabel='全33教会',parallelAccounting='先生円卓既登録FT鍛冶調達→教会伝授/配分、C仕分け救援、基地生活');s['weather']={'day':97,'description':'リムグレイブは朝霧のち晴れ間。教会の石床はまだ冷たい。'}
s['runeLedger'].update(opening=opening,income=income,spending=spending,balance=bal,custody={'教会共同財布':bal,'遠征共同財布':0},summary=f'{opening}+3000−{spending}={bal}r。原資37742の{spending/37742:.2%}使用。')
arrows=sum(x.get('ammunition',{}).get('arrows',0) for x in a);s['arrowSupply'].update(ordinaryArrowCount=arrows,purchasedThisTurn=200,purchasedCount=200,purchaseCost=400,spentThisTurn=0,lastScene='1-107',lastUpdated='DAY97 11:30',status='花/千夏へ100本ずつ補給。午前戦闘消費なし。',note='366+200=566')
s['foodInventory'].update(availablePortions=29,remainingServings=29,readyServings=29,cookedServings=29,remainingMeatServings=29,consumedThisScene=33,lostThisScene=0,byLocation={'エレの教会':29},dailyRationsAccountedDay=97,note='62−DAY97一日分33=29。朝に先計上、午後/夜の二重消費禁止。新狩猟成果なし。');s['waterLedger'].update(scene='1-107',openingPotableLitres=5,rawCollectedLitres=4,processedLitres=4,usedLitres=4,closingPotableLitres=5,tripsThisTurn=1,cumulativeTrips=s['waterLedger']['cumulativeTrips']+1,byLocation={'エレの教会':5},day97ProcessedSoFar=4,summary='午前4L処理/4配給。簡略卓一日12の残8Lは未処理、二重計上禁止。')
s['camp'].update(rest='DAY97午前・聖防護試演後教会で休息、最後に先生弧1使用',food='29食（DAY97配給済）',water='5L',remainingServings=29,remainingMeatServings=29);s['camp']['waterStorage'].update(potableTotalLitres=5,distributionNote='午前4L処理配給、保存5L。')
s['deployment'].update(currentLocations={'エレの教会':list(by)},note='DAY97午前全33教会、最終戦未開始',currentMovement={'status':'先生円卓往復完了、主力出撃前'});s['equipmentUpgradePlanHistory'].append(copy.deepcopy(s['equipmentUpgradePlan']));s['equipmentUpgradePlan']={'scene':'1-107','asOf':'DAY97午前','status':'最終戦前の強化実施済み','orders':orders,'totalCost':sum(o['materialCost']+o['fee'] for o in orders)};s.setdefault('repairReportHistory',[]).append(copy.deepcopy(s['repairReport']));s['repairReport']={'scene':'1-107','day':97,'items':repairs,'count':len(repairs),'cost':len(repairs)*10}
s['preparation107']={'orders':orders,'normalMaterials':materials,'normalCost':sum(o['materialCost']+o['fee'] for o in orders),'armor':armor,'armorAdjustmentCost':60,'repairs':repairs,'repairCost':150,'purchases':[{'name':'王たる聖防護','quantity':1,'cost':350},{'name':'ルーンの弧','quantity':2,'cost':800},{'name':'通常矢','quantity':200,'cost':400}],'totalSpending':spending,'openingIncludingRemembrance':37742,'balance':bal,'sacredTear':{'owner':'私','from':0,'to':1,'quantityConsumed':1,'charges':4},'greatRune':copy.deepcopy(s['greatRune107']),'arcReserve':1,'holyUser':'石川 紬','holyPrepared':True,'firePrepared':False,'blackBladeRemembranceUnused':True,'hoarahRemembranceConsumed':True,'levelsChanged':False,'battleStarted':False,'newDeaths':0,'newInjuries':0,'foodChargedDay':97}
s['endingDiscussion107']={'status':'勝利前の希望と質問。エンディング未成立、女神への照会未実施。','returnContract':s['victoryCondition'],'hopes':['全33人が生存/復活済みで帰還する','メリナを取り戻せるか女神に問いたい','元の学校生活に戻った時、経験や記憶をどう抱えて生きるか話したい'],'notConfirmed':['メリナ復活の可否と条件','原世界に帰る時点・経過時間','NPCの同行可否','失敗時の次世界作品と持越し内容'],'principle':'通常ルートでメリナが払った代償を未確認の願いだけで取り消さない。勝利後も彼女自身の意思を尊重する。'}
s['progress'].update(label='最終二連戦前・最後の補給完了',basis='94%GM目安維持、準備をボス撃破に算入しない。');s['campaignBudget'].update(asOf='DAY97午前',remainingUsableDays=3,remainingDaysInclusive=3,remainingDaysNote='DAY97は午前のみ。今日97の挑戦と98–99、計画行動日3日。期限100終了。',latestPlan='97午後最終連戦へ、98–99調整用。今回戦闘未抽選。',review='回復量/聖防護/一人分大ルーン/装備配分と通常強化完了。',nextReview='二連戦の術・瓶消費条件と犠牲時の継続手順');s['nextDecision']={'action':'王座へ主力13で向かい、最終二連戦の条件を固定して抽選。現在は教会で準備完了。','notRolled':True};s['teacherReconPlan'].update(status='DAY97午前、教会で準備完了',equipment='片手剣+24、瓶回復量+1、ゴドリック大ルーン効果中、クララ+1。',intent='最終二連戦へ出発待ち、まだ戦闘していない。');s['map']['current']='DAY97午前全33教会。新地点なし、王座主力13登録維持。';s['graceRestHistory'].append({'scene':'1-107','day':97,'name':'エレの教会','party':list(by),'purpose':'配分/試演後休息。最後に先生が弧を使用、最終戦未開始。'});s['spiritSummoning63'].update(usedThisScene=0,remainingUses=1,remainingBeforeRest=1,restoredAt='DAY97出発前休息')
assert bal==3942,(bal,spending);assert spending==33800 and len(repairs)==15 and len(armor)==6;assert arrows==566
out={'scene':'1-107','day':97,'storyDay':97,'currentSummary':'DAY97午前、最終戦準備完了。先生剣+24/瓶+1/大ルーン、紬聖防護、通常主力強化と防具6点配分。3942r/566矢/29食（日配給済）/水5L。全33教会、二連戦未開始。','nextAction':s['nextDecision']['action'],'balance':bal,'arrows':arrows,'food':29,'water':5,'newDeaths':0,'newInjuries':0}
for fn,obj in [('resolved-state.json',s),('outcome.json',out),('equipment-order.json',s['preparation107'])]:(p/fn).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
print(out);print('cost',spending,'materials',materials)

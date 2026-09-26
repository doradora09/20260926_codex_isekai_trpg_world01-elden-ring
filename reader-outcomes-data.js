// Verified battle rewards and end-of-scene progress; never displayed above the story.
window.READER_OUTCOMES = {
  "1-34": {
    "kind": "retreat",
    "label": "撤退",
    "subject": "関門前の陣地",
    "summary": "制圧は持ち越し。大地の軽傷は治療済み。",
    "event": "",
    "source": "story/turn-1-34.json"
  },
  "1-36": {
    "kind": "victory",
    "label": "制圧",
    "subject": "関門前の陣地",
    "summary": "敵陣を一度制圧し、全員帰還。",
    "event": "",
    "source": "story/turn-1-36.json"
  },
  "1-39": {
    "kind": "survived",
    "label": "夜明けまで生存",
    "subject": "教会で迎えた夜",
    "summary": "襲撃も負傷もなく、朝を迎えた。",
    "event": "赤月 · DAY20",
    "source": "story/turn-1-39.json",
    "aftermath": {
      "deaths": 0,
      "injured": 0,
      "damage": "教会への襲撃なし。周辺の木1本が騎士に砕かれた。",
      "supplies": "夜間の追加消費は計上なし。",
      "evidence": [
        "redMoonEncounter.partyInjuries",
        "redMoonEncounter.partyDeaths",
        "redMoonEncounter.observations",
        "redMoonEncounter.fire"
      ],
      "source": "story/turn-1-39.json"
    }
  },
  "1-41": {
    "kind": "victory",
    "label": "撃破",
    "subject": "ツリーガード",
    "summary": "先生は負傷したが、騎士を倒して帰還。",
    "event": "",
    "source": "story/turn-1-41.json",
    "encounter": "boss",
    "rewards": {
      "runes": 320,
      "items": [
        "黄金のハルバード"
      ],
      "source": "story/turn-1-41.json"
    },
    "progressChange": {
      "before": 6,
      "after": 6,
      "delta": 0,
      "estimated": false,
      "source": "turn-1-41.json"
    }
  },
  "1-43": {
    "kind": "survived",
    "label": "襲撃なし",
    "subject": "今夜は、誰も欠けていない",
    "summary": "倒した騎士は戻らず、全員で夜を過ごした。",
    "event": "赤月 · DAY30",
    "source": "story/turn-1-43.json",
    "aftermath": {
      "deaths": 0,
      "injured": null,
      "injuryNote": "赤月による新規負傷の記録なし",
      "damage": "襲撃なし。夜間の新たな損耗の記録なし。",
      "evidence": [
        "text: DAY30・21:40以降",
        "goddessEncounter43.confirmed"
      ],
      "source": "story/turn-1-43.json"
    }
  },
  "1-46": {
    "kind": "victory",
    "label": "撃破",
    "subject": "忌み鬼マルギット",
    "summary": "出撃した21人が全員帰還。",
    "event": "",
    "source": "story/turn-1-46.json",
    "encounter": "boss",
    "rewards": {
      "runes": 1200,
      "items": [
        "タリスマン袋"
      ],
      "source": "story/turn-1-46.json"
    },
    "progressChange": {
      "before": 6,
      "after": 10,
      "delta": 4,
      "estimated": false,
      "source": "turn-1-46.json"
    }
  },
  "1-48": {
    "kind": "survived",
    "label": "防衛成功",
    "subject": "エレの教会",
    "summary": "33人生存。新たな負傷者なし。",
    "event": "赤月 · DAY40",
    "source": "story/turn-1-48.json",
    "aftermath": {
      "deaths": 0,
      "injured": 0,
      "damage": "剣・盾・斧槍・弓・杖、計13点の耐久が各1低下。",
      "supplies": "防衛で矢24本使用。回復の出番なし。",
      "evidence": [
        "battle48.newDeaths",
        "battle48.newInjuries",
        "equipmentEvents: scene=1-48, 赤月",
        "loadouts: 赤月防衛6矢×4人"
      ],
      "source": "story/turn-1-48.json"
    }
  },
  "1-51": {
    "kind": "victory",
    "label": "撃破",
    "subject": "接ぎ木のゴドリック",
    "summary": "主力13人の返事が揃った。",
    "event": "",
    "source": "story/turn-1-51.json",
    "encounter": "boss",
    "rewards": {
      "runes": 2000,
      "items": [
        "ゴドリックの大ルーン",
        "接ぎ木の追憶"
      ],
      "source": "story/turn-1-51.json"
    },
    "progressChange": {
      "before": 10,
      "after": 20,
      "delta": 10,
      "estimated": false,
      "source": "turn-1-51.json"
    }
  },
  "1-57": {
    "kind": "advance",
    "label": "鍵を確保",
    "subject": "学院の輝石鍵",
    "summary": "竜とは交戦せず、離脱。",
    "event": "",
    "source": "story/turn-1-57.json"
  },
  "1-58": {
    "kind": "retreat",
    "label": "撤退",
    "subject": "学院の墓地",
    "summary": "攻略は持ち越し。健太は治療済み。",
    "event": "",
    "source": "story/turn-1-58.json"
  },
  "1-59": {
    "kind": "victory",
    "label": "撃破",
    "subject": "ラダゴンの赤狼",
    "summary": "メモリ・ストーンを確保。",
    "event": "",
    "source": "story/turn-1-59.json",
    "encounter": "boss",
    "rewards": {
      "runes": 1400,
      "items": [
        "メモリ・ストーン"
      ],
      "source": "story/turn-1-59.json"
    },
    "progressChange": {
      "before": 20,
      "after": 20,
      "delta": 0,
      "estimated": false,
      "source": "turn-1-59.json"
    }
  },
  "1-60": {
    "kind": "retreat",
    "label": "脱出成功",
    "subject": "学院から教会へ",
    "summary": "陽太と紬を治療し、戦闘を切って帰還。",
    "event": "赤月 · DAY50",
    "source": "story/turn-1-60.json",
    "aftermath": {
      "deaths": 0,
      "injured": 2,
      "injuryNote": "陽太・紬／治療済み",
      "damage": "迎撃と退避で武器・盾・杖・衣類に損耗。",
      "supplies": "陽太と紬が赤瓶を各1回使用。",
      "evidence": [
        "dayOperations60",
        "loadouts.equipment.history: scene=1-60"
      ],
      "source": "story/turn-1-60.json"
    }
  },
  "1-61": {
    "kind": "advance",
    "label": "突破",
    "subject": "大書庫へ続く道",
    "summary": "鉄球とムーングラムを越え、大書庫前へ。",
    "event": "",
    "source": "story/turn-1-61.json"
  },
  "1-62": {
    "kind": "victory",
    "label": "勝利",
    "subject": "満月の女王レナラ",
    "summary": "33人が教会へ揃った。",
    "event": "",
    "source": "story/turn-1-62.json",
    "encounter": "boss",
    "rewards": {
      "runes": 4000,
      "items": [
        "産まれなき者の大ルーン",
        "満月の女王の追憶"
      ],
      "source": "story/turn-1-62.json"
    },
    "progressChange": {
      "before": 20,
      "after": 30,
      "delta": 10,
      "estimated": false,
      "source": "turn-1-62.json"
    }
  },
  "1-70": {
    "kind": "survived",
    "label": "防衛成功",
    "subject": "エレの教会",
    "summary": "33人の返事を確かめ、夜明けを待った。",
    "event": "赤月 · DAY60",
    "source": "story/turn-1-70.json",
    "aftermath": {
      "deaths": 0,
      "injured": 0,
      "damage": "二波の防衛で主使用の武器・盾・弓・杖が損耗。",
      "supplies": "矢16本使用。赤瓶の使用なし。",
      "evidence": [
        "redMoon70",
        "loadouts.equipment.history: scene=1-70"
      ],
      "source": "story/turn-1-70.json"
    }
  },
  "1-73": {
    "kind": "retreat",
    "label": "撤退",
    "subject": "竜のツリーガード",
    "summary": "未撃破。全員生存、傷は治療済み。",
    "event": "",
    "source": "story/turn-1-73.json",
    "encounter": "boss"
  },
  "1-75": {
    "kind": "victory",
    "label": "撃破",
    "subject": "竜のツリーガード",
    "summary": "主力13人は無傷。大竜爪と竜爪の盾を獲得。",
    "event": "",
    "source": "story/turn-1-75.json",
    "encounter": "boss",
    "rewards": {
      "runes": 5000,
      "items": [
        "大竜爪",
        "竜爪の盾"
      ],
      "source": "story/turn-1-75.json"
    },
    "progressChange": {
      "before": 30,
      "after": 35,
      "delta": 5,
      "estimated": true,
      "source": "turn-1-75.json"
    }
  },
  "1-78": {
    "kind": "victory",
    "label": "撃破",
    "subject": "最初の王ゴッドフレイ（幻影）",
    "summary": "タリスマン袋を確保し、補給へ。",
    "event": "",
    "source": "story/turn-1-78.json",
    "encounter": "boss",
    "rewards": {
      "runes": 8000,
      "items": [
        "タリスマン袋"
      ],
      "source": "story/turn-1-78.json"
    },
    "progressChange": {
      "before": 40,
      "after": 45,
      "delta": 5,
      "estimated": true,
      "source": "turn-1-78.json"
    }
  },
  "1-80": {
    "kind": "survived",
    "label": "夜明けまで生存",
    "subject": "教会を守る夜",
    "summary": "巨人をやり過ごし、33人が無傷で残った。",
    "event": "赤月 · DAY70",
    "source": "story/turn-1-80.json",
    "aftermath": {
      "deaths": 0,
      "injured": 0,
      "damage": "古い天幕の端に小損傷。補強した石壁は維持。武器・盾にも損耗。",
      "supplies": "食料・医療用の布の損失なし。赤瓶の使用なし。",
      "evidence": [
        "redMoon80",
        "loadouts.equipment.history: scene=1-80"
      ],
      "source": "story/turn-1-80.json"
    }
  },
  "1-84": {
    "kind": "victory",
    "label": "撃破",
    "subject": "忌み王モーゴット",
    "summary": "ロルドの割符を受領。次の道は山嶺へ。",
    "event": "",
    "source": "story/turn-1-84.json",
    "encounter": "boss",
    "rewards": {
      "runes": 12000,
      "items": [
        "モーゴットの大ルーン",
        "忌み王の追憶"
      ],
      "source": "story/turn-1-84.json"
    },
    "progressChange": {
      "before": 45,
      "after": 55,
      "delta": 10,
      "estimated": true,
      "source": "turn-1-84.json"
    }
  },
  "1-90": {
    "kind": "survived",
    "label": "防衛成功",
    "subject": "エレの教会",
    "summary": "33人生存。新たな負傷・備蓄の損失なし。",
    "event": "赤月 · DAY80",
    "source": "story/turn-1-90.json",
    "aftermath": {
      "deaths": 0,
      "injured": 0,
      "damage": "主要装備12点の耐久が各2低下。天幕の端に傷み。石壁は維持。",
      "supplies": "備蓄の損失なし。",
      "evidence": [
        "defense90.newDeaths",
        "defense90.newInjuries",
        "defense90.wear",
        "defense90.finish",
        "defense90.stockLost"
      ],
      "source": "story/turn-1-90.json"
    }
  },
  "1-92": {
    "kind": "victory",
    "label": "撃破",
    "subject": "火の巨人",
    "summary": "新たな負傷者・死者なし。",
    "event": "",
    "source": "story/turn-1-92.json",
    "encounter": "boss",
    "rewards": {
      "runes": 18000,
      "items": [
        "火の巨人の追憶"
      ],
      "source": "story/turn-1-92.json"
    },
    "progressChange": {
      "before": 65,
      "after": 70,
      "delta": 5,
      "estimated": false,
      "source": "turn-1-92.json"
    }
  },
  "1-95": {
    "kind": "victory",
    "label": "撃破",
    "subject": "神肌のふたり",
    "summary": "新たな負傷者・死者なし。",
    "event": "",
    "source": "story/turn-1-95.json",
    "encounter": "boss",
    "rewards": {
      "runes": 17000,
      "items": [
        "鍛石掘りの鈴玉【4】",
        "戦灰「黒炎の渦」"
      ],
      "source": "story/turn-1-95.json"
    },
    "progressChange": {
      "before": 74,
      "after": 78,
      "delta": 4,
      "estimated": false,
      "source": "turn-1-95.json"
    }
  },
  "1-98": {
    "kind": "retreat",
    "label": "撤退",
    "subject": "黒き剣マリケス",
    "summary": "門番は撃破。マリケスは未撃破、13人で再戦へ。",
    "event": "",
    "source": "story/turn-1-98.json",
    "encounter": "boss"
  },
  "1-100": {
    "kind": "survived",
    "label": "防衛成功",
    "subject": "エレの教会",
    "summary": "負傷者を治療し、33人で夜明けを迎えた。",
    "event": "赤月 · DAY90",
    "source": "story/turn-1-100.json",
    "aftermath": {
      "deaths": 0,
      "injured": 1,
      "injuryNote": "陽太／治療・休息で回復",
      "damage": "武器・盾・触媒など16点の耐久が各2低下。",
      "supplies": "矢24本使用。食料6食分を雨と泥で喪失。",
      "evidence": [
        "defense100.newDeaths",
        "defense100.newInjuries",
        "defense100.injured",
        "defense100.wear",
        "defense100.foodLost",
        "text: 夜が薄れるまでに"
      ],
      "source": "story/turn-1-100.json"
    }
  },
  "1-101": {
    "kind": "victory",
    "label": "撃破",
    "subject": "黒き剣マリケス",
    "summary": "主力13人の生存を確認。",
    "event": "",
    "source": "story/turn-1-101.json",
    "encounter": "boss",
    "rewards": {
      "runes": 22000,
      "items": [
        "黒き剣の追憶"
      ],
      "source": "story/turn-1-101.json"
    },
    "progressChange": {
      "before": 80,
      "after": 86,
      "delta": 6,
      "estimated": false,
      "source": "turn-1-101.json"
    }
  },
  "1-102": {
    "kind": "victory",
    "label": "撃破",
    "subject": "百智卿ギデオン＝オーフニール",
    "summary": "次の王座へ道がつながった。",
    "event": "",
    "source": "story/turn-1-102.json",
    "encounter": "boss",
    "rewards": {
      "runes": 15000,
      "items": [
        "百智の王笏",
        "百智一式"
      ],
      "source": "story/turn-1-102.json"
    },
    "progressChange": {
      "before": 86,
      "after": 88,
      "delta": 2,
      "estimated": false,
      "source": "turn-1-102.json"
    }
  },
  "1-103": {
    "kind": "retreat",
    "label": "撤退",
    "subject": "最初の王ゴッドフレイ",
    "summary": "未撃破。教会で態勢を立て直す。",
    "event": "",
    "source": "story/turn-1-103.json",
    "encounter": "boss"
  },
  "1-106": {
    "kind": "victory",
    "label": "撃破",
    "subject": "ゴッドフレイ／ホーラ・ルー",
    "summary": "新たな死者なし。全員で教会へ帰還。",
    "event": "",
    "source": "story/turn-1-106.json",
    "encounter": "boss",
    "rewards": {
      "runes": 30000,
      "items": [
        "ホーラ・ルーの追憶"
      ],
      "source": "story/turn-1-106.json"
    },
    "progressChange": {
      "before": 88,
      "after": 94,
      "delta": 6,
      "estimated": false,
      "source": "turn-1-106.json"
    }
  },
  "1-108": {
    "kind": "victory",
    "label": "二連戦突破",
    "subject": "ラダゴン／エルデの獣",
    "summary": "33人が教会へ。世界の結末は、これから選ぶ。",
    "event": "",
    "source": "story/turn-1-108.json",
    "encounter": "boss",
    "rewards": {
      "runes": 50000,
      "items": [
        "エルデの追憶"
      ],
      "source": "story/turn-1-108.json"
    },
    "progressChange": {
      "before": 94,
      "after": 99,
      "delta": 5,
      "estimated": false,
      "source": "turn-1-108.json"
    }
  },
  "1-110": {
    "kind": "home",
    "label": "全員帰還",
    "subject": "DAY98 · 帰還条件達成",
    "summary": "先生1人、生徒32人。全員で元の世界へ。",
    "event": "",
    "source": "story/turn-1-110.json"
  }
};

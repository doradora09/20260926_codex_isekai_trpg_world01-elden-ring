# TURN1−62 原作参照と卓独自部分

- レナラ戦の二段階、歌う金色の学生、魔術と一時召喚、物理攻撃を主とする攻略: https://www.windowscentral.com/elden-ring-how-beat-rennala
- 一時召喚は狼・猟犬騎士・巨人・竜など。出現中は回避し消失を待つ案: https://www.gamerguides.com/elden-ring/guide/academy-of-raya-lucaria/bosses/how-to-beat-rennala-queen-of-the-full-moon
- レナラ本人は戦後も生存するNPC。ラニの介入と第二形態: https://eldenring.fandom.com/wiki/Rennala%2C_Queen_of_the_Full_Moon
- 魔力防護の必要信仰10、円卓コリンの原作販売価格3500: https://game8.jp/eldenring/440794
- 魔力防護は術者自身を保護。味方への範囲強化は黄金の魔力防護という別祈祷: https://eldenring.fandom.com/wiki/Magic
- 王都の黄金の魔力防護は信仰24: https://gamewith.jp/eldenring/323995

会話、心理、時刻、班構成、教室外連絡員、資材、戦果の数値は独自物語。原作のオンライン人数上限を再現しない。魔力防護350+聖印80、レナラ4000ルーンは本卓の縮小会計。新祈祷の1回/休息という回数換算も卓独自。詠唱対象は先生だけで、味方や物理・炎へ拡張しない。ラニの声は原作長文を転載せず物語中で言い換え。

conditions.jsonを先に固定し、resolve.pyで一度ずつ抽選。分岐の再抽選なし。召喚種の描写は巨人を選択、抽選後の難度補正追加なし。報酬4000は抽選後に既往の原作1/10基準と照合し確定、勝敗・被害に影響なし。

## 判定条件の記録
- [条件監査メモ](turn-1-62-conditions-audit-note.json)
- [抽選時条件案](turn-1-62-conditions-proposal.json)
抽選コードは再現用実行ではなく抽選時コードの記録です。ファイル保管名は当時と異なります。出目は再抽選しません。

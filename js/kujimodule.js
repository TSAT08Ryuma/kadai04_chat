 let Line3 = "";

//   <!--** 以下Firebase **-->
/* // Import the functions you need from the SDKs you need */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved, runTransaction, onValue }
    from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// Your web app's Firebase configuration */
const firebaseConfig = {
    apiKey: xxx,
    authDomain: xxx,
    databaseURL: xxx,
    projectId: xxx,
    storageBucket: xxx,
    messagingSenderId: xxx,
    appId: xxx
};

/* // Initialize Firebase    // ファイアベース起動 */
const app = initializeApp(firebaseConfig);
/* // 中でアプリ起動 */
const db = getDatabase(app);
/* // チャットフォルダに関して指定 */
const dbRef = ref(db, "chat");

function sending() {
    let add1 = Number(count_1prize);
    let add2 = Number(count_2prize);
    let add3 = Number(count_3prize);
    let add4 = Number(count_4prize);
    let add5 = Number(count_5prize);
    let add6 = Number(count_6prize);
    return [add1, add2, add3, add4, add5, add6]
};

function update(){
    const[add1,add2,add3,add4,add5,add6] = sending();
    runTransaction(dbRef, function (curr) {
    //dbRef（＝ref(db,"chat")）は「Firebaseのデータの箱」そのもの。
    // runTransaction(dbRef, function(curr){...}) が呼ばれると、
    // Firebaseが dbRef の中身を読んで curr に入れてくれる。
    // もし curr がまだ存在しない（＝null）なら、
    // { prize1:0, prize2:0, prize3:0 } という箱を新しく作る。
    // 既に値があれば curr.prize1 を探して、その数字に加算する。
    // // 関数を処理し終わると、return された curr が Firebase の /chat に上書き保存される
    // トランサクションのは、データベースの箱そのものの中で更新するやつ。
    // currに入れているけど、入れないで処理もできる。
    // たぶんオブジェクトで処理しているのはそういう関数だからかな？
    if (curr === null) {
        curr = { prize1: 0, prize2: 0, prize3: 0, prize4: 0, prize5: 0, prize6: 0 };
    }
    curr.prize1 = (curr.prize1 || 0) + add1;
    curr.prize2 = (curr.prize2 || 0) + add2;
    curr.prize3 = (curr.prize3 || 0) + add3;
    curr.prize4 = (curr.prize4 || 0) + add4;
    curr.prize5 = (curr.prize5 || 0) + add5;
    curr.prize6 = (curr.prize6 || 0) + add6;
    return curr;
})};

// ここからデータを集計させる。
// 下部に　amount1 amount2 amount3 amount4 amount5 amount6で皆の頻度を計算したものを結果の右側に入れてみんなで検証する遊びを入れる。
// APIアプリのほう先やって、時間があれば、もう一つの候補は順位を出させること。
// スコアを送信させるゲーム③で順位を出すゲームを実装する。s ?? 0というのはnullとか変なの入ってきたら０で返すってやつ
// 今回はリターンで関数外で使えるようにしている。まずはジェイクエリでdivの箱を作り、textで入力された文字をタグや記号を文字列として扱い、オブジェクトではなくhtmlを返すためにhtmlつけてる
// データの引数はプリセット。deRefデータから取り出したもの引数dataにわたしている。次の行でオブジェクトから値を取り出しているんだ。

function esc(s) {
  return Number(s ?? 0);
  }

//   .valはFirebaseのメソッド
onValue(dbRef,function(data){
    const output = data.val();
    // console.log(output);
    // console.log(esc(output.prize5));
    // console.dir(Object.values(output), "配列");
            document.getElementById("answer4a").textContent = esc(output.prize1);
            document.getElementById("answer5a").textContent = esc(output.prize2);
            document.getElementById("answer6a").textContent = esc(output.prize3);
            document.getElementById("answer7a").textContent = esc(output.prize4);
            document.getElementById("answer8a").textContent = esc(output.prize5);
            document.getElementById("answer9a").textContent = esc(output.prize6);
            const kitaichi = esc(output.prize1 * 200000000 + output.prize2 * 10000000 + output.prize3 * 300000 + output.prize4 * 6800 + output.prize5 * 3000 + output.prize6 * 0)/((output.prize1 + output.prize2 + output.prize3 + output.prize4 + output.prize5 + output.prize6)*200);
            document.getElementById("kitaichi").textContent = kitaichi.toFixed(2);
            console.log(output.prize4)
            const array08_kitaichi = [Number(esc(output.prize1)), Number(esc(output.prize2)), Number(esc(output.prize3)), Number(esc(output.prize4)), Number(esc(output.prize5)), Number(esc(output.prize6))];
             // グラフ３の結果を表示させつつけるよ
 let ctx3 = document.getElementById('myChart_circul');
        if (Line3) {
            Line3.destroy();
        }
        Line3 = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: [1,2,3,4,5,"はずれ"],
                datasets: [
                    {
                        label: '全プレーヤーの結果',
                        data: array08_kitaichi,
                        borderColor: 'rgba(233, 97, 6, 1)',
                        backgroundColor: 'rgba(211, 71, 24, 1)',
                    }
                ]
            },
        });

  });

window.sending = sending;
window.update = update;

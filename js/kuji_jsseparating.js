let num_asset = Number(document.getElementById("num_asset").value); //資産額を確認し続ける
let array07_graph = []; //グラフ2を書くために10の数字を格納する配列
let array06_graph = []; //グラフ2を書くために数字を格納する配列
let array05_graph = []; //グラフ1を作るための横軸用の空列
let array04_graph = []; //グラフ1を作るための数字の配列
let array03 = []; //array03は43の配列のうち6番目のボーナス数字を取得
let array02 = []; //array02は43の配列のうち0-5番目のボーナス数字を取得
let array01 = []; //array01は入力した値を取得する配列
let count_hit = 0; //count_hitは通常数字のヒットを判定
let count_hit2 = 0; //count_hit2はボーナス数字のヒットを判定
let kake_amount //賭け金総額
let death_amount = 0;
let count_money_toushigaku = 0;
let count_money_goukeigaku = 0; 
let count_money_tousengaku = 0; //count_money_tousengaku = count_money_goukeigaku - count_money_toushigaku
let odds = 1;
let times = 1;
let count_1prize = 0;
let count_2prize = 0;
let count_3prize = 0;
let count_4prize = 0;
let count_5prize = 0;
let count_6prize = 0;
const wrapper = document.getElementById('AAA'); //ID名AAのオブジェクトへの操作用
let outcome = "";
let Line = "";
let Line2 = "";

let ctx = document.getElementById('myChart_line');
let ctx2 = document.getElementById('myChart_bar');

//シャッフルアルゴリズム
function getValue0() {
    // くじ数字を変数に入力
    const t0 = Number(document.getElementById("num0").value);
    const t1 = Number(document.getElementById("num1").value);
    const t2 = Number(document.getElementById("num2").value);
    const t3 = Number(document.getElementById("num3").value);
    const t4 = Number(document.getElementById("num4").value);
    const t5 = Number(document.getElementById("num5").value);
    // 昇順に変更するアロー関数
    array01 = [t0, t1, t2, t3, t4, t5];
    array01.sort((a, b) => a - b);
    // 同じ数字を入れられたので警告
    for (let n = 0; n < 5; n++) {
        if (array01[n] === array01[n + 1]) {
            alert("同じ数字が入力されているため、当選確率が低下しています")
        }
    }
}

//シャッフルアルゴリズム
function shuffle_check() {
    //試行回数を取得 
    times = Number(document.getElementById("num6").value);
    // 試行回数分試行
    for (let n = 0; n < times; n++) {
        // 倍率を取得
        odds = Number(document.getElementById("num7").value);
        // 判定数のカウントを0にリセット、各回毎に当選判定
        count_hit = 0;
        count_hit2 = 0;
        // 掛け金を倍率分増加
        count_money_toushigaku -= 200 * odds;
        count_money_goukeigaku -= 200 * odds;
        // 重複なしアルゴリズム
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43
        ];
        var a = arr.length;
        while (a) {
            var j = Math.floor(Math.random() * a);
            var t = arr[--a];
            arr[a] = arr[j];
            arr[j] = t;
        }
        // 最初の６つを取得
        array02 = arr.slice(0, 6);
        array02.sort(function (a, b) {
            return a - b;
        });
        // ７つ目を取得
        array03 = arr.slice(6, 7);
        // 当選番号をwrapper=AAタグオブジェクトに記載する操作
        for (let p = 0; p < 6; p++) {
            wrapper.insertAdjacentHTML('beforeend', String(array02[p]).padStart(2, '0') + ' ');
        }
        // ヒット数のカウント
        for (let i = 0; i < 6; i++) {
            if (array01.includes(array02[i])) {
                count_hit += 1;
            }
        }
        if (array01.includes(array03[0])) {
            count_hit2 += 1;
        }
        // ヒット数による当選判定
        if (count_hit === 6) {
            count_money_goukeigaku += 200000000 * odds;
            outcome = "１等賞";
            count_1prize += 1;
        } else if (count_hit === 5 && count_hit2 === 1) {
            count_money_goukeigaku += 10000000 * odds;
            outcome = "２等賞";
            count_2prize += 1;
        } else if (count_hit === 5) {
            count_money_goukeigaku += 300000 * odds;
            outcome = "３等賞";
            count_3prize += 1;
        } else if (count_hit === 4) {
            count_money_goukeigaku += 6800 * odds;
            outcome = "４等賞";
            count_4prize += 1;
        } else if (count_hit === 3) {
            count_money_goukeigaku += 1000 * odds;
            outcome = "５等賞";
            count_5prize += 1;
        } else {
            count_money_goukeigaku += 0;
            outcome = "はずれ";
            count_6prize += 1;
        }
        // ボーナス数字表示
        wrapper.insertAdjacentHTML('beforeend', ' ボーナス数字: ' + String(array03[0]).padStart(2, '0') + '　当選結果:　' + outcome + '</br>')
        // outcomeをリセット
        outcome = "";
        // 当選金額描写
        document.getElementById("answer_goukeigaku").textContent = count_money_goukeigaku.toLocaleString();
        document.getElementById("answer_toushigaku").textContent = count_money_toushigaku.toLocaleString();
        count_money_tousengaku = count_money_goukeigaku - count_money_toushigaku;
        document.getElementById("answer_tousengaku").textContent = count_money_tousengaku.toLocaleString();
        // 当選判定描写
        document.getElementById("answer4").textContent = count_1prize;
        document.getElementById("answer5").textContent = count_2prize;
        document.getElementById("answer6").textContent = count_3prize;
        document.getElementById("answer7").textContent = count_4prize;
        document.getElementById("answer8").textContent = count_5prize;
        document.getElementById("answer9").textContent = count_6prize;
        // アレイ4に合計額を入れて、アレイ5はグラフ1用の空欄
        array04_graph.push(count_money_goukeigaku);
        array05_graph.push("");
    }
    // アレイ4と5を活用したグラフ1描写JS
    if (Line) {
        Line.destroy();
    }
    Line = new Chart(ctx, {
        type: 'line',
        data: {
            labels: array05_graph,
            datasets: [
                {
                    label: '合計額',
                    data: array04_graph,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }
            ]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.15)' },
                }
            }
        }
    });

    // ローカルストレージに直近10データを格納
    array06_graph.push(Number(document.getElementById("answer_goukeigaku").textContent.replaceAll(",", "")));
    array07_graph = array06_graph.slice(-10);
    localStorage.setItem("memo", array07_graph);

    // グラフ2を描写
    if (Line2) {
        Line2.destroy();
    }
    Line2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            datasets: [
                {
                    label: '合計額',
                    data: array07_graph,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }
            ],
        },
        options: {
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.15)' } },
            }
        }
    });
}


function bounu() {
}


//ボタン１を押したらグラフ２を完全削除
function reset_for_button1() {
    if (Line2) {
        localStorage.removeItem("memo");
        array07_graph = [];
        array06_graph = [];
        array05_graph = [];
        array04_graph = [];
        count_1prize = 0;
        count_2prize = 0;
        count_3prize = 0;
        count_4prize = 0;
        count_5prize = 0;
        count_6prize = 0;
        count_money_goukeigaku = 0;
        count_money_toushigaku = 0;
        count_money_tousengaku = 0;
        document.getElementById("answer_toushigaku").textContent = count_money_toushigaku;
        document.getElementById("answer_tousengaku").textContent = count_money_tousengaku;
        document.getElementById("answer_goukeigaku").textContent = count_money_goukeigaku;
        document.getElementById("answer4").textContent = count_1prize;
        document.getElementById("answer5").textContent = count_2prize;
        document.getElementById("answer6").textContent = count_3prize;
        document.getElementById("answer7").textContent = count_4prize;
        document.getElementById("answer8").textContent = count_5prize;
        document.getElementById("answer9").textContent = count_6prize;
        wrapper.innerHTML = '<p>【当選番号および当選結果】</p>';
        Line2.destroy();
    }
};

//ボタン２を押したらグラフ１を完全削除
function reset_for_button2() {
    if (Line) {
        localStorage.removeItem("memo");
        array07_graph = [];
        array06_graph = [];
        array05_graph = [];
        array04_graph = [];
        count_1prize = 0;
        count_2prize = 0;
        count_3prize = 0;
        count_4prize = 0;
        count_5prize = 0;
        count_6prize = 0;
        count_money_goukeigaku = 0;
        count_money_toushigaku = 0;
        count_money_tousengaku = 0;
        document.getElementById("answer_toushigaku").textContent = count_money_toushigaku;
        document.getElementById("answer_tousengaku").textContent = count_money_tousengaku;
        document.getElementById("answer_goukeigaku").textContent = count_money_goukeigaku;
        document.getElementById("answer4").textContent = count_1prize;
        document.getElementById("answer5").textContent = count_2prize;
        document.getElementById("answer6").textContent = count_3prize;
        document.getElementById("answer7").textContent = count_4prize;
        document.getElementById("answer8").textContent = count_5prize;
        document.getElementById("answer9").textContent = count_6prize;
        wrapper.innerHTML = '<p>【当選番号および当選結果】</p>';
        Line.destroy();
    }
};

// ゲーム⓶は前回のデータを削除しているのでその処理
function reset_for_button2_β() {
    array05_graph = [];
    array04_graph = [];
    count_1prize = 0;
    count_2prize = 0;
    count_3prize = 0;
    count_4prize = 0;
    count_5prize = 0;
    count_6prize = 0;
    count_money_goukeigaku = 0;
    count_money_toushigaku = 0;
    count_money_tousengaku = 0;
    document.getElementById("answer_toushigaku").textContent = count_money_toushigaku;
    document.getElementById("answer_tousengaku").textContent = count_money_tousengaku;
    document.getElementById("answer_goukeigaku").textContent = count_money_goukeigaku;
    document.getElementById("answer4").textContent = count_1prize;
    document.getElementById("answer5").textContent = count_2prize;
    document.getElementById("answer6").textContent = count_3prize;
    document.getElementById("answer7").textContent = count_4prize;
    document.getElementById("answer8").textContent = count_5prize;
    document.getElementById("answer9").textContent = count_6prize;
    wrapper.innerHTML = '<p>【当選番号および当選結果】</p>';
    // Line.destroy();
    // Line2.destroy();
};

//配列２のグラフを削除
function reset2() {
    if (Line2) {
        Line2.destroy();
        Line2 = "";
    }
}

//配列１のグラフを削除
function reset1() {
    if (Line) {
        Line.destroy();
        Line = "";
    }
}

// 変な数字入れるな！
function limit() {
    let inputnumber0 = Number(document.getElementById("num0").value);
    let inputnumber1 = Number(document.getElementById("num1").value);
    let inputnumber2 = Number(document.getElementById("num2").value);
    let inputnumber3 = Number(document.getElementById("num3").value);
    let inputnumber4 = Number(document.getElementById("num4").value);
    let inputnumber5 = Number(document.getElementById("num5").value);
    let inputnumber6 = Number(document.getElementById("num6").value);
    let inputnumber7 = Number(document.getElementById("num7").value);
    if (inputnumber0 < 0 || inputnumber0 > 43 || !Number.isInteger(inputnumber0)) {
        document.getElementById("num0").value = 1
    }
    if (inputnumber1 < 0 || inputnumber1 > 43 || !Number.isInteger(inputnumber1)) {
        document.getElementById("num1").value = 2
    }
    if (inputnumber2 < 0 || inputnumber2 > 43 || !Number.isInteger(inputnumber2)) {
        document.getElementById("num2").value = 3
    }
    if (inputnumber3 < 0 || inputnumber3 > 43 || !Number.isInteger(inputnumber3)) {
        document.getElementById("num3").value = 4
    }
    if (inputnumber4 < 0 || inputnumber4 > 43 || !Number.isInteger(inputnumber4)) {
        document.getElementById("num4").value = 5
    }
    if (inputnumber5 < 0 || inputnumber5 > 43 || !Number.isInteger(inputnumber5)) {
        document.getElementById("num5").value = 6
    }
    if (inputnumber6 < 0 || inputnumber6 > 10000 || !Number.isInteger(inputnumber6)) {
        document.getElementById("num6").value = 100
    }
    if (inputnumber7 < 0 || inputnumber7 > 10000 || !Number.isInteger(inputnumber7)) {
        document.getElementById("num7").value = 10000
    }
}

Chart.defaults.color = 'white'

// ムービータグ３の映像
function movie() {
    let movie = document.getElementById("movie")
    let movie_1prize = document.getElementById("movie_1prize")
    let movie_2prize = document.getElementById("movie_2prize")
    let movie_3prize = document.getElementById("movie_3prize")
    let movie_kakuhen = document.getElementById("movie_kakuhen")
    let movieback = document.getElementById("all")
    let movie_prize = ""

    // １等賞
    if (count_1prize > 0) {
        // いったんすべての動画を非表示に
        var videos = [movie_1prize, movie_2prize, movie_3prize, movie_kakuhen];
        for (var i = 0; i < videos.length; i++) {
            var v = videos[i];
            v.pause();
            v.currentTime = 0;
            v.style.display = "none";
        }

        // 変数に1等の動画を代入
        movie_prize = movie_1prize
        // 1つの動画を再表示
        movie_prize.style.display = "";

        // 動画が変な動きしないように止めて、0秒にしてロードして稼働
        movie_prize.pause();
        movie_prize.currentTime = 0;
        movie_prize.load();
        movie_prize.muted = true;
        movie_prize.play().catch(() => { });

        // 操作させない＆ムービーのオパシティ設定 ｚIndexは基本0で親要素が負だと親要素ごと沈んでしまう
        movie.style.pointerEvents = "auto";
        movie.style.opacity = "1";
        movie.style.zIndex = "99998";
        // 透明度を発生／動画はすべて0opacityでIndex99999という設定にCSSでしている
        movie_prize.style.opacity = "1";
        movie_prize.style.zIndex = "99999";
        movieback.style.opacity = "1";
        movieback.style.zIndex = "99997";

        setTimeout(function () {
            movie.style.pointerEvents = "none";
            movie.style.opacity = "0";
            movie.style.zIndex = "-2"
            movieback.style.opacity = "0";
            movieback.style.zIndex = "-3";
            movie_prize.style.opacity = "0";
            movie_prize.pause();
            movie_prize.currentTime = 0;
        }, 5000);
    }
    else if (count_2prize > 0) {
        // いったんすべての動画を非表示に
        var videos = [movie_1prize, movie_2prize, movie_3prize, movie_kakuhen];
        for (var i = 0; i < videos.length; i++) {
            var v = videos[i];
            v.pause();
            v.currentTime = 0;
            v.style.display = "none";
        }

        // 変数に2等の動画を代入
        movie_prize = movie_2prize
        // 1つの動画を再表示
        movie_prize.style.display = "";

        // 動画が変な動きしないように止めて、0秒にしてロードして稼働
        movie_prize.pause();
        movie_prize.currentTime = 0;
        movie_prize.load();
        movie_prize.muted = true;
        movie_prize.play().catch(() => { });

        // 操作させない＆ムービーのオパシティ設定 ｚIndexは基本0で親要素が負だと親要素ごと沈んでしまう
        movie.style.pointerEvents = "auto";
        movie.style.opacity = "1";
        movie.style.zIndex = "99998";
        // 透明度を発生／動画はすべて0opacityでIndex99999という設定にCSSでしている
        movie_prize.style.opacity = "1";
        movie_prize.style.zIndex = "99999";
        movieback.style.opacity = "1";
        movieback.style.zIndex = "99997";

        setTimeout(function () {
            movie.style.pointerEvents = "none";
            movie.style.opacity = "0";
            movie.style.zIndex = "-2"
            movieback.style.opacity = "0";
            movieback.style.zIndex = "-3";
            movie_prize.style.opacity = "0";
            movie_prize.pause();
            movie_prize.currentTime = 0;
        }, 5000);


    }
    else if (count_3prize > 0) {
        // いったんすべての動画を非表示に
        var videos = [movie_1prize, movie_2prize, movie_3prize, movie_kakuhen];
        for (var i = 0; i < videos.length; i++) {
            var v = videos[i];
            v.pause();
            v.currentTime = 0;
            v.style.display = "none";
        }

        // 変数に3等の動画を代入
        movie_prize = movie_3prize
        // 1つの動画を再表示
        movie_prize.style.display = "";

        // 動画が変な動きしないように止めて、0秒にしてロードして稼働
        movie_prize.pause();
        movie_prize.currentTime = 0;
        movie_prize.load();
        movie_prize.muted = true;
        movie_prize.play().catch(() => { });

        // 操作させない＆ムービーのオパシティ設定 ｚIndexは基本0で親要素が負だと親要素ごと沈んでしまう
        movie.style.pointerEvents = "auto";
        movie.style.opacity = "1";
        movie.style.zIndex = "99998";
        // 透明度を発生／動画はすべて0opacityでIndex99999という設定にCSSでしている
        movie_prize.style.opacity = "1";
        movie_prize.style.zIndex = "99999";
        movieback.style.opacity = "1";
        movieback.style.zIndex = "99997";

        setTimeout(function () {
            movie.style.pointerEvents = "none";
            movie.style.opacity = "0";
            movie.style.zIndex = "-2"
            movieback.style.opacity = "0";
            movieback.style.zIndex = "-3";
            movie_prize.style.opacity = "0";
            movie_prize.pause();
            movie_prize.currentTime = 0;
        }, 5000);
    }
}

// ローカルストレージから初期残高を確保
if (localStorage.getItem("num_asset") !== null) {
    document.getElementById("num_asset").value = localStorage.getItem("num_asset");
}

// 資産額を入力できなくするか判定する
if (localStorage.getItem("num_asset") !== null) {
    document.getElementById("num_asset").disabled = "true"
}
// 初回の画面に保有資産額を表示する
document.getElementById("holding_money").textContent = "保有ゴールド： " + Number(document.getElementById("num_asset").value).toLocaleString()
kake_amount = document.getElementById("num6").value * document.getElementById("num7").value * 200
document.getElementById("kake_amount").textContent = "1クリック: " + kake_amount.toLocaleString()
// ボタンの回数判定してボタンクリック不可にする
if (Number(localStorage.getItem("death_amount")) > 4) {
            document.getElementById("button_saving").disabled = "true"
        }


// 画面に保有資産額を表示する
function holding_money() {
    document.getElementById("holding_money").textContent = "保有ゴールド： " + Number(document.getElementById("num_asset").value).toLocaleString()
}

// 賭け総額を出すよ
function kake_amount_calculation() {
    kake_amount = document.getElementById("num6").value * document.getElementById("num7").value * 200
    document.getElementById("kake_amount").textContent = "1クリック: " + kake_amount.toLocaleString()
}

// ボタンを押したらブラウザにデータが飛ぶ
function save() {
    localStorage.setItem("num_asset", Number(num_asset));
}

// ボタンを押したら保有資産額に結果を足して表示する
function calculation() {
    num_asset = num_asset + count_money_goukeigaku;
    document.getElementById("num_asset").value = num_asset
    document.getElementById("holding_money").textContent = "保有ゴールド： " + Number(document.getElementById("num_asset").value).toLocaleString()
    if (localStorage.getItem("num_asset") !== null) {
        document.getElementById("num_asset").disabled = "true"
        }
    if (num_asset < 0) {
        death_amount = death_amount + 1
        localStorage.setItem("death_amount", death_amount)
        const array_messeage =
            ["", "借金開始あと４回", "借金あと３回", "借金あと２回", "借金あと１回", "Game Over"]
        alert(array_messeage[Number(localStorage.getItem("death_amount"))])
        if (death_amount > 4) {
            document.getElementById("button_saving").disabled = "true"
        }
        localStorage.setItem("num_asset", Number(document.getElementById("num_asset").value));
    }
}



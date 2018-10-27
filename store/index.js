export const state = () => {

    return {
        stock: [], //山場
        stockcard: [], //山札
        foundation: [ //組札x4
            [],
            [],
            [],
            []
        ],
        tableau: [], //場札
        clearMessage: ""
    }
}

export const getters = {
    getScore: (state) => {
        let score = 0
        for (let i = 0; i < 4; i++) {
            score += state.foundation[i].length
        }
        if (score == 52) {
            score = "全クリアおめでとう！！"
        }
        return score
    }
}

export const mutations = {

    startGame(state, tempCardsArr) {
        const newStock = state.stock.concat();
        const newTableau = state.tableau.concat();

        // i番目とr番目を入れ替える処理を繰り返し、カードをシャッフルする 
        for (let i = tempCardsArr.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1)); //51~1までの乱数を作る
            let tmp = tempCardsArr[i];
            tempCardsArr[i] = tempCardsArr[r];
            tempCardsArr[r] = tmp;
        }

        // 山場プロパティに入れる
        for (let i = 0; i < 24; i++) {
            newStock.push(tempCardsArr.pop());
        }
        // 山場プロパティのカードをface=trueにする
        for (let i = 0; i < 24; i++) {
            newStock[i].face = true
        }

        // 場札プロパティに入れる
        for (let i = 0; i < 7; i++) {
            const column = []
            newTableau.push(column); //7つ空の配列を生成（これが場x7になる）
            for (let n = 0; n <= i; n++) {
                column.push(tempCardsArr.pop()); //各場の列にカードを１枚ずつ増やして入れる
            }
            column[i].face = true;
        }

        state.stock = newStock;
        state.tableau = newTableau;
    },

    openStock(state) {
        const newStock = state.stock.concat();
        const newStockCard = state.stockcard.concat();

        if (newStock.length >= 1) {
            newStockCard.push(newStock.pop());
        } else {
            for (let i = newStockCard.length; i > 0; i--) {
                newStock.push(newStockCard.pop());
            }
        }
        state.stock = newStock;
        state.stockcard = newStockCard
    },

    //場の中での移動処理
    changeDataFromTableau(state, info) {
        const newTableau = [...state.tableau]
        newTableau[info.fromA][info.fromB].face = true;

        const moveCard = newTableau[info.fromA].splice(info.fromB)
        for (let i = 0; i < moveCard.length; i++) {
            newTableau[info.toA].push(moveCard[i])

            if (newTableau[info.fromA].length > 0 && newTableau[info.fromA][info.fromB - 1]) {
                newTableau[info.fromA][info.fromB - 1].face = true;
            }
            state.tableau = newTableau;
        }
    },

    //山場から場への移動処理
    changeDataFromStock(state, info) {
        const newStockCard = [...state.stockcard];
        const newTableau = [...state.tableau];
        newStockCard[info.from].face = true;
        const moveCard = newStockCard.splice(info.from)
        for (let i = 0; i < moveCard.length; i++) {
            newTableau[info.toA].push(moveCard[i])
        }
        state.tableau = newTableau;
        state.stockcard = newStockCard
    },

    //組札から場への戻し移動の処理
    changeDataFromFoundation(state, info){
        const newTableau = [...state.tableau];
        const newFoundation = [...state.foundation];

        const moveCard = newFoundation[info.fromA].splice(info.fromB)
        for (let i = 0; i < moveCard.length; i++) {
            newTableau[info.toA].push(moveCard[i])
        }
        state.tableau = newTableau;
        state.foundation = newFoundation

    },


    // 以下組札への移動処理

    // 場から組札への移動処理（1番）
    foundationFromTableau1(state, info) {
        const newTableau = [...state.tableau]
        const newFoundation = [...state.foundation]

        const moveCard = newTableau[info.fromA].splice(info.fromB)
        for (let i = 0; i < 4; i++) {
            if (newFoundation[i].length == 0) {
                newFoundation[i].push(moveCard[0])
                if (newTableau[info.fromA].length > 0 && newTableau[info.fromA][info.fromB - 1]) {
                    newTableau[info.fromA][info.fromB - 1].face = true;
                }
                state.tableau = newTableau;
                state.foundation = newFoundation
                break
            }
        }


    },

    // 山場から組札への移動処理（1番）
    foundationFromStock1(state, info) {
        const newStockCard = [...state.stockcard];
        const newFoundation = [...state.foundation]

        const moveCard = newStockCard.splice(info.from)
        for (let i = 0; i < 4; i++) {
            if (newFoundation[i].length == 0) {
                newFoundation[i].push(moveCard[0])
                break
            }
        }
        state.stockcard = newStockCard
        state.foundation = newFoundation
    },


    // 場から組札への移動処理（2番以降）
    foundationFromTableau(state, info) {
        const newTableau = [...state.tableau]
        const newFoundation = [...state.foundation]

        const moveCard = newTableau[info.fromA][info.fromB]

        for (let i = 0; i < state.foundation.length; i++) {
            if (newFoundation[i].length > 0 && newFoundation[i][0].pattern === moveCard.pattern) {
                const length = newFoundation[i].length
                if (moveCard.number - newFoundation[i][length - 1].number == 1) {
                    newFoundation[i].push(moveCard)
                    newTableau[info.fromA].splice(info.fromB)

                    if (newTableau[info.fromA].length > 0 && newTableau[info.fromA][info.fromB - 1]) {
                        newTableau[info.fromA][info.fromB - 1].face = true;
                    }
                    state.tableau = newTableau;
                    state.foundation = newFoundation
                    break
                }
            }
        }


    },

    // 山場から組札への移動処理（2番以降）
    foundationFromStock(state, info) {
        const newStockCard = [...state.stockcard];
        const newFoundation = [...state.foundation]

        const moveCard = newStockCard[info.from]

        for (let i = 0; i < state.foundation.length; i++) {
            if (newFoundation[i].length > 0 && newFoundation[i][0].pattern === moveCard.pattern) {
                const length = newFoundation[i].length
                if (moveCard.number - newFoundation[i][length - 1].number == 1) {
                    newFoundation[i].push(moveCard)
                    newStockCard.splice(info.from)
                }
            }
        }

        state.stockcard = newStockCard
        state.foundation = newFoundation
    },

}
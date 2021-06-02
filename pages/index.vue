<template>
  <div class="background">

  <Score/>
    <!-- 山札 -->
    <Stock @openStock="$store.commit('openStock')"/>

    <StockCard v-for="stock in $store.state.stockcard"
    :key="stock.id" :stock="stock" @judge="judge(stock)" @foundation="foundation(stock)"
    :style="stock.id === moveCardData.id ? 'border:solid 1px red' : ''"
    />

    <!-- 組札 -->
    <div class="foundationDom">
      <div class="fnd" v-for="(fnd,index) in $store.state.foundation"
      :key="fnd.id" :style="`left:${(index*121)+359}px;`"/>
    </div>
    
    <Foundation1 v-for="(fnd1,index) in $store.state.foundation[0]"
    :key="fnd1.id" :fnd1="fnd1" :index="index" @judge="judge(fnd1)"
    :style="fnd1.id === moveCardData.id ? 'border:solid 1px red' : ''"/>

    <Foundation2 v-for="(fnd2,index) in $store.state.foundation[1]"
    :key="fnd2.id" :fnd2="fnd2" :index="index" @judge="judge(fnd2)"
    :style="fnd2.id === moveCardData.id ? 'border:solid 1px red' : ''"/>

    <Foundation3 v-for="(fnd3,index) in $store.state.foundation[2]"
    :key="fnd3.id" :fnd3="fnd3" :index="index" @judge="judge(fnd3)"
    :style="fnd3.id === moveCardData.id ? 'border:solid 1px red' : ''"/>

    <Foundation4 v-for="(fnd4,index) in $store.state.foundation[3]"
    :key="fnd4.id" :fnd4="fnd4" :index="index" @judge="judge(fnd4)"
    :style="fnd4.id === moveCardData.id ? 'border:solid 1px red' : ''"/>

    <!-- 場札 -->
    <div class="tableauDom">
      <div class="clm" v-for="(clm,index) in $store.state.tableau"
      :key="clm.id" :style="`left:${(index*121)+20}px;`"
      @click="moveKing(index)"
      />
    </div>

    <Tableau1 v-for="(column1,index) in $store.state.tableau[0]"
    :key="column1.id" :column1="column1" :index="index"
    :style="column1.id === moveCardData.id ? 'border:solid 1px red' : ''"
    @judge="judge(column1)" @foundation="foundation(column1)"/>
    
    <Tableau2 v-for="(column2,index) in $store.state.tableau[1]"
    :key="column2.id" :column2="column2" :index="index"
    :style="column2.id === moveCardData.id ? 'border:solid 1px red' : ''"
    @judge="judge(column2)" @foundation="foundation(column2)"/>
    
    <Tableau3 v-for="(column3,index) in $store.state.tableau[2]"
    :key="column3.id" :column3="column3" :index="index"
    :style="column3.id === moveCardData.id ? 'border:solid 1px red' : ''"
    @judge="judge(column3)" @foundation="foundation(column3)"/>
    
    <Tableau4 v-for="(column4,index) in $store.state.tableau[3]"
    :key="column4.id" :column4="column4" :index="index"
    :style="column4.id === moveCardData.id ? 'border:solid 1px red' : ''"
    @judge="judge(column4)" @foundation="foundation(column4)"/>
    
    <Tableau5 v-for="(column5,index) in $store.state.tableau[4]"
    :key="column5.id" :column5="column5" :index="index"
    :style="column5.id === moveCardData.id ? 'border:solid 1px red' : ''"
    @judge="judge(column5)" @foundation="foundation(column5)"/>

    <Tableau6 v-for="(column6,index) in $store.state.tableau[5]"
    :key="column6.id" :column6="column6" :index="index"
    :style="column6.id === moveCardData.id ? 'border:solid 1px red' : ''"
    @judge="judge(column6)" @foundation="foundation(column6)"/>

    <Tableau7 v-for="(column7,index) in $store.state.tableau[6]"
    :key="column7.id" :column7="column7" :index="index"
    :style="column7.id === moveCardData.id ? 'border:solid 1px red' : ''"
    @judge="judge(column7)" @foundation="foundation(column7)"/>

  </div>
</template>


<script>
import Stock from "~/components/Stock.vue";
import StockCard from "~/components/StockCard.vue";
import Foundation1 from "~/components/Foundation1.vue";
import Foundation2 from "~/components/Foundation2.vue";
import Foundation3 from "~/components/Foundation3.vue";
import Foundation4 from "~/components/Foundation4.vue";
import Tableau1 from "~/components/Tableau1.vue";
import Tableau2 from "~/components/Tableau2.vue";
import Tableau3 from "~/components/Tableau3.vue";
import Tableau4 from "~/components/Tableau4.vue";
import Tableau5 from "~/components/Tableau5.vue";
import Tableau6 from "~/components/Tableau6.vue";
import Tableau7 from "~/components/Tableau7.vue";
import Score from "~/components/Score.vue";

export default {
  components: {
    Stock,
    StockCard,
    Foundation1,
    Foundation2,
    Foundation3,
    Foundation4,
    Tableau1,
    Tableau2,
    Tableau3,
    Tableau4,
    Tableau5,
    Tableau6,
    Tableau7,
    Score
  },

  data() {
    return {
      moveId: [],
      judgeBox: [],
      moveCardData: []
      // index: null
    };
  },
  computed: {
  },
  mounted() {
    const tempCardsArr = [];
    let id = 1;
    for (let pattern = 0; pattern < 4; pattern++) {
      for (let num = 1; num <= 13; num++) {
        tempCardsArr.push(genCard(num, pattern, id));
        id++;
      }
    }
    this.$store.commit("startGame", tempCardsArr);


    function genCard(number, pattern, id) {
      return {
        id: id,
        number: number,
        pattern: pattern,
        face: false,
      };
    }
  },
  methods: {
    judge(info) {
      this.moveCardData={...info};

      let jb = this.judgeBox;
      this.moveId.push(info.id);
      if (info.face === false) return;
      if (jb.length >= 4 && this.moveCardData.length>=2) return;
      jb.push(info.pattern, info.number);

      if (jb.length == 4) {
        // 空の列に13を置ける様にする処理
        if (jb[1] == 13 && jb[3] == undefined) {
          this.moveKing();
          this.moveId.length = 0;
          this.moveCardData = "";
        }

        // ハートの場合の条件分岐処理
        if ((jb[0] == 0 && jb[2] == 2) || (jb[0] == 0 && jb[2] == 3)) {
          if (jb[3] - jb[1] == 1) {
            jb.length = 0;
            this.findData();
            this.moveId.length = 0;
            this.moveCardData = "";
          }
        }
        // ダイヤの場合の条件分岐処理
        if ((jb[0] == 1 && jb[2] == 2) || (jb[0] == 1 && jb[2] == 3)) {
          if (jb[3] - jb[1] == 1) {
            jb.length = 0;
            this.findData();
            this.moveId.length = 0;
            this.moveCardData = "";
          }
        }
        // クローバーの場合の条件分岐処理
        if ((jb[0] == 2 && jb[2] == 0) || (jb[0] == 2 && jb[2] == 1)) {
          if (jb[3] - jb[1] == 1) {
            jb.length = 0;
            this.findData();
            this.moveId.length = 0;
            this.moveCardData = "";
          }
        }
        // スペードの場合の条件分岐処理
        if ((jb[0] == 3 && jb[2] == 0) || (jb[0] == 3 && jb[2] == 1)) {
          if (jb[3] - jb[1] == 1) {
            jb.length = 0;
            this.findData();
            this.moveId.length = 0;
            this.moveCardData = "";
          }
        }
        jb.length = 0;
        this.moveId.length = 0;
        this.moveCardData = "";
      } //if文全体の閉じタグ
    },

    findData() {
      const newTableau = this.$store.state.tableau.concat();
      const newStockCard = this.$store.state.stockcard.concat();
      const newFoundation = this.$store.state.foundation.concat();

      //tableauカードの特定///////////////////////////////////////////
      // データからmoveIdと一致するものを探す（２次元配列なので、まずは１次元目を調べる）
      const tableauIndexArr = [];
      for (let i = 0; i < 7; i++) {
        tableauIndexArr.push(
          newTableau[i].findIndex(data => data.id === this.moveId[0])
        );
      }

      // -1以外の物を取り出す。これが１次元目のindex番号
      const fromIndex = tableauIndexArr.filter(function(element) {
        return element > -1;
      });

      const fromTableau = fromIndex[0]; //

      // ２次元目のの何番目にいるのかを調べる
      const tableauIndexFrom = tableauIndexArr.indexOf(fromTableau);


      //stockcardの特定///////////////////////////////////////////
      const fromStockCard = newStockCard.findIndex(
        data => data.id === this.moveId[0]
      );


      //foundationカードの特定///////////////////////////////////////////
      // データからmoveIdと一致するものを探す（２次元配列なので、まずは１次元目を調べる）
      const foundationIndexArr = [];
      for (let i = 0; i < 4; i++) {
        foundationIndexArr.push(
          newFoundation[i].findIndex(data => data.id === this.moveId[0])
        );
      }

      // -1以外の物を取り出す。これが１次元目のindex番号
      const fromFoundationIndex = foundationIndexArr.filter(function(element) {
        return element > -1;
      });

      const fromFoundation = fromFoundationIndex[0]; //

      // ２次元目のの何番目にいるのかを調べる
      const foundationIndexFrom = foundationIndexArr.indexOf(fromFoundation);


      //////////////////////////////////////////////////////////////////////
      // 以下カードの置く場所特定（置くのは常にtableau）
      /////////////////////////////////////////////////////////////////////

      // データからidと一致するものを探す（２次元配列なので、全てチェックし一旦配列に格納）
      const toIndexArr = [];
      for (let i = 0; i < 7; i++) {
        toIndexArr.push(
          newTableau[i].findIndex(data => data.id === this.moveId[1])
        );
      }

      // -1以外の物を取り出す
      const toIndex = toIndexArr.filter(function(element) {
        return element > -1;
      });

      const to = toIndex[0]; //数値に変換

      // 二次元配列の何番目にいるのかを調べる
      const tableauIndexTo = toIndexArr.indexOf(to);

      const moveFromStock = {
        from: fromStockCard,
        toA: tableauIndexTo,
        toB: to
      };

      const moveFromTableau = {
        fromA: tableauIndexFrom,
        fromB: fromTableau,
        toA: tableauIndexTo,
        toB: to
      };

      const moveFromFoundation = {
        fromA: foundationIndexFrom,
        fromB: fromFoundation,
        toA: tableauIndexTo,
        toB: to
      };

      if (fromStockCard == -1 && fromTableau > -1) {
        this.$store.commit("changeDataFromTableau", moveFromTableau);
      } else if (fromStockCard > -1 && fromTableau == undefined) {
        this.$store.commit("changeDataFromStock", moveFromStock);
      } else if (foundationIndexFrom > -1){
        this.$store.commit("changeDataFromFoundation", moveFromFoundation);
      }
    }, //findData閉じタグ

    moveKing(index) {
      const newTableau = [...this.$store.state.tableau];
      const newStockCard = [...this.$store.state.stockcard];

      const kingId = this.moveId[0];
      this.moveId.length = 0;
      this.moveCardData = "";

      // データからmoveIdと一致するものを探す（２次元配列なので、まずは１次元目を調べる）
      const tableauIndexArr = [];
      for (let i = 0; i < 7; i++) {
        tableauIndexArr.push(
          newTableau[i].findIndex(data => data.id === kingId)
        );
      }

      //上の処理のstockcard版。一次元配列なのでループは不要。
      const fromStockCard = newStockCard.findIndex(data => data.id === kingId);

      // -1以外の物を取り出す。これが１次元目のindex番号
      const fromIndex = tableauIndexArr.filter(function(element) {
        return element > -1;
      });

      const fromTableau = fromIndex[0]; //

      // ２次元目のの何番目にいるのかを調べる
      const tableauIndexFrom = tableauIndexArr.indexOf(fromTableau);

      const moveFromStock = {
        from: fromStockCard,
        toA: index
      };

      const moveFromTableau = {
        fromA: tableauIndexFrom,
        fromB: fromTableau,
        toA: index
      };

      if (fromStockCard == -1 && fromTableau > -1) {
        this.$store.commit("changeDataFromTableau", moveFromTableau);
      } else if (fromStockCard > -1 && fromTableau == undefined) {
        this.$store.commit("changeDataFromStock", moveFromStock);
      }

      this.judgeBox.length = 0;
      this.moveId.length = 0;
    }, //moveKing閉じタグ

    foundation(info) {
      const newTableau = [...this.$store.state.tableau];
      const newStockCard = [...this.$store.state.stockcard];
      const newFoundation = [...this.$store.state.foundation];

      const targetId = info.id;

      const tableauIndexArr = [];
      for (let i = 0; i < 7; i++) {
        tableauIndexArr.push(
          newTableau[i].findIndex(data => data.id === targetId)
        );
      }

      // -1以外の物を取り出す。これは２次元目のindex番号
      const fromIndex = tableauIndexArr.filter(function(element) {
        return element > -1;
      });

      //データを成形
      const fromTableau = fromIndex[0];

      //1次元目のindex番号を調べる
      const tableauIndexFrom = tableauIndexArr.indexOf(fromTableau);

      //上の処理のstockcard版。一次元配列なのでこれだけでOK
      const fromStockCard = newStockCard.findIndex(
        data => data.id === targetId
      );

      const moveFromTableau = {
        fromA: tableauIndexFrom,
        fromB: fromTableau
      };

      const moveFromStock = {
        from: fromStockCard
      };

      if (info.number == 1) {
        if (fromStockCard == -1 && fromTableau > -1) {
          this.$store.commit("foundationFromTableau1", moveFromTableau);
        } else if (fromStockCard > -1 && fromTableau == undefined) {
          this.$store.commit("foundationFromStock1", moveFromStock);
        }
      }

      if (info.number > 1) {
        if (fromStockCard == -1 && fromTableau > -1) {
          this.$store.commit("foundationFromTableau", moveFromTableau);
        } else if (fromStockCard > -1 && fromTableau == undefined) {
          this.$store.commit("foundationFromStock", moveFromStock);
        }
      }

      this.judgeBox.length = 0;
      this.moveId.length = 0;
    }
  } //mutations閉じタグ
};
</script>


<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  background-color: green;
}

.tableauDom {
  position: fixed;
  display: flex;
  top: 220px;
  left: 20px;
}

.clm {
  width: 101px;
  height: 140px;
  border: 1px solid white;
  background-color: transparent;
  border-radius: 4px;
  margin-right: 12px;
}

.foundationDom {
  position: fixed;
  display: flex;
  top: 50px;
  left: 359px;
}

.fnd {
  width: 101px;
  height: 140px;
  border: 1px solid white;
  border-radius: 4px;
  margin-right: 12px;
}
</style>

<template>
  <v-card
      class="mx-auto"
      max-width="400"
  >
    <v-row
        align="center"
        justify="center"
    >
    <avataaar
        :avatarStyle="avatar.avatarStyle"
        :accessoriesType="avatar.accessoriesType"
        :clotheType="avatar.clotheType"
        :clotheColor="avatar.clotheColor"
        :eyebrowType="avatar.eyebrowType"
        :eyeType="avatar.eyeType"
        :facialHairColor="avatar.facialHairColor"
        :facialHairType="avatar.facialHairType"
        :graphicType="avatar.graphicType"
        :hairColor="avatar.hairColor"
        :mouthType="avatar.mouthType"
        :skinColor="avatar.skinColor"
        :topType:="avatar.topType"
    ></avataaar>
    </v-row>

    <v-card-text>

  <!--    <span>Number 10</span><br>
      <span class="text&#45;&#45;primary">
        <span>Whitehaven Beach</span><br>
        <span>Whitsunday Island, Whitsunday Islands</span>
      </span>-->
      <div  v-for="(meta, name) in metadata">
        <h3>{{name}}</h3>
        <v-select
            v-model="avatar[name]"
            :items="meta"
            solo
        ></v-select>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
          text
          color="green"
      >
        Save
      </v-btn>
      <v-btn
          text
          color="orange"
          @click="$router.go(-1)"
      >
        Back
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import Avataaar from 'vue-avataaar'

    export default {
        components: {Avataaar},
        data() {
            return {
                metadata: {
                    avatarStyle: [
                        "Circle", "Transparent"
                    ],
                    accessoriesType: [
                        "Blank", "Kurt", "Prescription01", "Prescription02", "Round",
                        "Sunglasses", "Wayfarers"
                    ],
                    clotheType: [
                        "BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie",
                        "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"
                    ],
                    clotheColor: [
                        "Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue",
                        "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"
                    ],
                    eyebrowType: [
                        "Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural",
                        "RaisedExcited", "RaisedExcitedNatural", "SadConcerned",
                        "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"
                    ],
                    eyeType: [
                        "Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts", "Side",
                        "Squint", "Surprised", "Wink", "WinkWacky"
                    ],
                    facialHairColor: [
                        "Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark",
                        "Platinum", "Red"
                    ],
                    facialHairType: [
                        "Blank", "BeardMedium", "BeardLight", "BeardMagestic", "MoustacheFancy",
                        "MoustacheMagnum"
                    ],
                    graphicType: [
                        "Bat", "Cumbia", "Deer", "Diamond", "Hola", "Pizza", "Resist", "Selena",
                        "Bear", "SkullOutline", "Skull"
                    ],
                    hairColor: [
                        "Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark",
                        "PastelPink", "Platinum", "Red", "SilverGray"
                    ],
                    mouthType: [
                        "Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad",
                        "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"
                    ],
                    skinColor: [
                        "Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"
                    ],
                    topType: [
                        "NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "WinterHat1",
                        "WinterHat2", "WinterHat3", "WinterHat4", "LongHairBigHair",
                        "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairCurvy",
                        "LongHairDreads", "LongHairFrida", "LongHairFro", "LongHairFroBand",
                        "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace",
                        "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand",
                        "ShortHairDreads01", "ShortHairDreads02", "ShortHairFrizzle",
                        "ShortHairShaggyMullet", "ShortHairShortCurly", "ShortHairShortFlat",
                        "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides",
                        "ShortHairTheCaesar", "ShortHairTheCaesarSidePart"
                    ]
                },
                avatar: {
                    avatarStyle: '',
                    accessoriesType: '',
                    clotheType: '',
                    clotheColor: '',
                    eyebrowType: '',
                    eyeType: '',
                    facialHairColor: '',
                    facialHairType: '',
                    graphicType: '',
                    hairColor: '',
                    mouthType: '',
                    skinColor: '',
                    topType: ''
                }
            }
        },
        methods: {
            randomElement(name){
                let index = Math.floor(Math.random() * this.metadata[name].length);
                return this.metadata[name][index];
            }
        },
        mounted() {
            for (name in this.avatar) {
                this.avatar[name] = this.randomElement(name);
            }
        }
    }
</script>
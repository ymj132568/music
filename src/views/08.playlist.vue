<template>
    <div class="playlist-container">
        <div class="top-wrap">
            <div class="img-wrap">
                <img :src="coverImgUrl" alt="">
            </div>
            <div class="info-wrap">
                <p class="title">{{title}}</p>
                <div class="author-wrap">
                    <img :src="avatarUrl" alt="" class="avatar">
                    <span class="name">{{nickname}}</span>
                    <span class="time">{{createTime}}创建</span>
                </div>
                <div class="play-wrap">
                    <span class="iconfont icon-circle-play"></span>
                    <span class="text">播放全部</span>
                </div>
                <div class="tag-wrap">
                    <span class="title">标签</span>
                    <ul>
                        <li v-for="item in tags" :key="item">{{item}}</li>
                    </ul>
                </div>
                <div class="desc-wrap">
                    <span class="title">简介</span>
                    <span
                    class="desc"> {{signature }}</span>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeIndex">
            <el-tab-pane label="歌曲列表" name="1">
                <table class="el-table playlit-table">
                    <th></th>
                    <th></th>
                    <th>音乐列表</th>
                    <th>歌手</th>
                    <th>专辑</th>
                    <th>时长</th>
                </table>
                <tbody>
                    <tr class="el-table_row" v-for="(item,index) in tableData" :key="item.id"> 
                        <td>{{index+1}}</td>
                        <td>
                        <div class="img-wrap" @click="playMusic(item.id)">
                            <img :src="item.al.picUrl" alt="">
                            <span class="iconfont icon-play"></span>
                        </div>
                        </td>
                        <div class="song-wrap">
                            <div class="name-wrap">
                                <span>{{item.name}}</span>
                                <span class="iconfont icon-mv" v-if='item.mv!=0' @click="toMV(item.mv)"></span>
                            </div>
                            <span>{{item.subTitle}}</span>
                        </div>
                        <td>{{item.ar[0].name}}/td>
                        <td>{{ item.al.name }}</td>
                        <td>{{ item.dt | formatDuration }}</td>
                    </tr>
                </tbody>
            </el-tab-pane>
            <el-tab-pane :label="`评论(${total+hotComments.length})`" name="2">
                <div class="comment-wrap" v-if='hotComments.length!=0'>
                    <p class="title">精彩评论<span class="number">{{hotComments.length}}</span></p>
                    <div class="comments-wrap" v-for="item in hotComments" :key="item.commentId">
                        <div class="item" >
                            <div class="icon-wrap">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="content-wrap">
                                <div class="content">
                                    <span class="name">{{ item.user.nickname }}:</span>
                                    <span class="cntent">{{ item.content }}</span>
                                </div>
                                <div class="re-content" v-if="item.beReplied.length != 0">
                                    <span class="name"
                                 >{{ item.beReplied[0].user.nickname }}：</span
                                 >
                                <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                                <div class="date">{{ item.time | formatTime }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-wrap">
                    <p class="title">最新评论<span class="number">{{total}}</span></p>
                    <div class="comments-wrap" v-if="comments.length!=0">
                        <div class="item"  v-for="item in comments" :key="item.commentId">
                            <div class="icon-wrap">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="content-wrap">
                                <div class="content">
                                    <span class="name">{{item.user.nickname}}：</span>
                                    <span class="cntent">{{ item.content }}</span>
                                </div>
                                <div class="re-content" v-if="item.beReplied.length!=0">
                                    <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                                    <span class="comment">{{ item.beReplied[0].content }}</span>
                                </div>
                                <div class="date">{{ item.time | formatTime }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination
                @current-change='handleCurrentChange'
                :total="total"
                :page-size="5"
                background 
                layout="prev,pager,next"
                :current-page="page"
                ></el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { playlistDetail, listComments, hotComments } from '@/api/playlist';
import { songUrl } from '@/api/discovery';
import moment from 'moment';
export default {
    name:'playlist',
    data() {
        return {
            activeIndex:'1',
            total:0,
            page:1,
            limit:20,
            playlist:[],
            hotCount:0,
            hotComments:[],
            comments:[],
            createTime:'',
            tags:[],
            signature:'',
            avatarUrl:'',
            title:'',
            coverImgUrl:'',
            nickname:'',
            tableData:[]
        }
    },
    created() {
       const{id}=this.$route.query;
       playlistDetail({
           id
       }).then(res=>{
            this.tableData = res.playlist.tracks;
            this.title = res.playlist.name;
            this.avatarUrl = res.playlist.creator.avatarUrl;
            this.coverImgUrl = res.playlist.coverImgUrl;
            this.signature = res.playlist.creator.signature;
            this.nickname = res.playlist.creator.nickname;
            this.tags = res.playlist.tags;
            this.createTime=moment(res.playlist.createTime).format('YYYY-MM-DD')
       });
       hotComments({
           id
       }).then(res=>{
           this.hotComments=res.hotComments
       });
       this.getComments()
    },
    methods: {
        toMV(id){this.$router.push(`/mv?id=${id}`)},
        getComments(){
            const{id}=this.$route.query;
            listComments({
                id,offest:(this.page-1)*5
            }).then(res=>{
                this.comments=res.comments;
                this.total=res.total
            })
        },
        handleCurrentChange(val){
            this.page=val
           this.getComments()
        },
        playMusic(id){
            songUrl({
                id:id
            }).then(res=>{
                this.$parent.url=res.data[0].url
            })
        }
    },
}
</script>
<style lang='scss'>

</style>
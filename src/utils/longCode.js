百度首页
消息
私信
商城

如太阳耀我心
网页资讯视频图片
知道
文库贴吧采购地图更多
求一个c语言代码，要就是长  我来答
首页
用户
合伙人
商城 法律 手机答题 我的
求一个c语言代码，要就是长
要求只有三个，能跑的起来，有指针，最好多一点指针，长，要特别长、、、我拿来仅仅是做测试用，不用知道这个代码干了啥、谢谢，求大神赐我点代码吧！...展开
 我来答 举报
3个回答#合辑# 机票是越早买越便宜吗？
匿名用户
2014-08-07
//C++ 轻重链剖分代码 有指针
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <algorithm>
#include <cstring>
 
using namespace std;
 
const int debug_mode = false; 
 
//int Max(int a, int b) {return a>b?a:b;}
//int Min(int a, int b) {return a>b?b:a;}
//
const int N = 300012;
int n, m;
int a[N + N], delta[N + N], b[N + N];
 
void update(int x) {
    a[x] = a[x << 1] + a[x * 2 + 1];
    b[x] = max(b[x << 1] , b[x * 2 + 1]);
}
 
void build(int x, int s, int t) {
    if (s == t) { a[x] = 0; b[x] = 0; return; }
    int mid = (s + t) >> 1;
    build(x << 1, s, mid);
    build(x * 2 + 1, mid + 1, t);
    update(x);
}
 
void change(int x, int s, int t, int pos, int key) {
    if (s == t && s == pos) { a[x] = key; b[x] = key; return; }
    int mid = (s + t) >> 1;
    if (pos <= mid) change(x << 1, s, mid, pos, key); else change(x * 2 + 1, mid + 1, t, pos, key);
    update(x);
}
 
int query(int x, int s, int t, int l, int r) {
    if (l <= s && t <= r) return b[x];
    int mid = s + t >> 1; int ans = -0x7fffffff; 
    if (l <= mid) ans =max(ans, query(x << 1, s, mid, l, r));
    if (r > mid) ans =max(ans, query(x * 2 + 1, mid + 1, t, l, r));
    return ans;
}
 
int querysum(int x, int s, int t, int l, int r)
{
    if(l <= s && t <= r)    return a[x];
    int mid = s + t >> 1; int ans = 0; 
    if(l <= mid)   ans += querysum(x<<1, s, mid, l, r);
    if(r > mid)        ans += querysum(x*2+1, mid+1, t, l, r);
    return ans;
}
//
 
struct edge{int u,v,; edge *next; bool inuse;}e[N], *P = e, *point[N];
inline void add_edge(int x, int y) {
    edge *Q = ++P; ++P;
    P->u = x; P->v = y; P->next = point[x]; point[x] = P; Q->u = y; Q->v = x; Q->next = point[y];point[y] = Q; P->inuse=Q->inuse = true;
}
int root,size[N],dep[N],top[N],fa[N],son[N],w[N],va[N];
 
void dfs1(int father,int x, int depth)
{
    fa[x] = father;
    dep[x] = depth;
    size[x] = 1;
    int sum=0, max=-1, maxi= son[x] = 0;
    for(edge *j = point[x]; j; j = j->next)
    {
        if(j->v == fa[x])  continue;
        dfs1(x,j->v,depth+1);
        sum += size[j->v];
        if(size[j->v] > max) maxi = j->v, max = size[j->v];
    }
    size[x] += sum;
    if(maxi)    son[x] = maxi;
}
 
int totw = 0;
void dfs2(int v, int Top)
{
    w[v] = ++totw; top[v] = Top;
    if(son[v])  dfs2(son[v],top[v]);
    for(edge *j = point[v]; j; j = j->next)
        if(j->v !=fa[v] && j->v != son[v])  
            dfs2(j->v,j->v);
}
 
 
int Qmax(int u, int v)
{
    int ret = -0x7fffffff;
    while(1)
    {
        int f1 = top[u], f2 = top[v];
        if(f1==f2)
        {  
            if(u==v)    return max(ret,query(1,1,n,w[u],w[u]));
            if(dep[u] > dep[v])    swap(u,v);
            ret = max(ret, query(1,1,n,w[u],w[v]));
            return ret;
        }else
        {
            if(dep[f1]<dep[f2]) swap(f1,f2), swap(u,v);
            ret = max(ret, query(1,1,n,min(w[u],w[f1]),max(w[u],w[f1])));
            u = fa[f1];
            continue;
        }
    }
}
 
int Qsum(int u, int v)
{
    int ret = 0;
    while(1)
    {
        int f1 = top[u], f2 = top[v];
        if(f1==f2)
        {  
            if(u==v)    return ret+va[u];
            ret += querysum(1,1,n,min(w[u],w[v]),max(w[u],w[v]));
            return ret;
        }else
        {
            if(dep[f1]<dep[f2]) swap(f1,f2), swap(u,v);
            // u f1
            ret += querysum(1,1,n,w[f1],w[u]);
            u = fa[f1]; f1 = top[u];
            continue;
        }
    }
}
 
void debug(int i)
{
    if(!debug_mode) return;
    cout<<i<<"-----------"<<endl;
    cout<<"fa[x]   : "<<fa[i]<<endl;
    cout<<"size[x] : "<<size[i]<<endl;
    cout<<"dep[x]  : "<<dep[i]<<endl;
    cout<<"son[x]  : "<<son[i]<<endl;
    cout<<"top[x]  : "<<top[i]<<endl;
    cout<<"w[x]    : "<<w[i]<<endl; 
}
 
int main()
{
    //freopen("bz1036.in","r",stdin);freopen("bz1036.out","w",stdout);
    scanf("%d", &n);
    for(int i = 1 ; i < n; i++)
    {
        int x,y;
        scanf("%d%d",&x, &y);
        add_edge(x,y);
        if(i==1)    root = x;
    }
    for(int i = 1; i <= n; i++)   scanf("%d", &va[i]);
    dfs1(0,root,1);
    dfs2(root,root);
    for(int i = 1; i <= n; i++)   change(1,1,n,w[i],va[i]);
    //for(int i = 1; i <= n; i++) debug(i);
    int t;
    scanf("%d", &t);
    while(t--)
    {
        char com[7]; scanf("%s", com);
        int a,b; scanf("%d%d", &a, &b);
        switch(com[1])
        {
            case 'M':
                printf("%d\n",Qmax(a,b));
                break;
            case 'S':
                printf("%d\n",Qsum(a,b));
                break;
            case 'H':
                va[a] = b;
                change(1,1,n,w[a],b);
                break;
        }
    }
     
}
 

//一个资源管理器模拟的代码
#include <iostream>
#include <cstdio>
#include <cstring>
#include <algorithm>
#include <cstdlib>
#include <vector>
 
using namespace std;
 
int idtop=0;
 
struct file
{
    int id;
    string name;
    bool is_folder;
    int father;
}files[2001],*root=files;
 
vector<int>ct[2001];//content
 
int history[10005],htop=0,hcur=0;
int current;
 
string rem[2001];
string prefix(int depth)
{
    if(rem[depth]!="")  return rem[depth];
    string ret;
    for(int d = 1; d <= depth; d++)   ret+="..";
    return rem[depth]=ret;
}
 
void print(int id, int depth)
{
    //cout<<depth<<endl;
    cout<<prefix(depth)<<"\\"<<files[id].name<<endl;//   ../folder
    for(int i = 0; i < ct[id].size(); i++)
    {
        if(files[ct[id][i]].is_folder) print(ct[id][i],depth+1);
        else    cout<<prefix(depth+1)<<files[ct[id][i]].name<<endl;  
    }
}
 
int newFile(bool isf, string name)
{
    for(int i = 0; i < ct[current].size(); i++)
        if(files[ct[current][i]].name == name && files[ct[current][i]].is_folder == isf)  return -1;
    files[++idtop].id = idtop;
    files[idtop].name = name;
    files[idtop].father = current;
    files[idtop].is_folder = isf;
    ct[current].push_back(idtop);
    if(isf)
    {
        current = idtop;
        history[htop = ++hcur] = idtop;
    }
    return 1;
}
 
int enter(string path)
{
    int posi = 0, cur_bk = current;
    if(path[0]=='\\'||path[path.length()-1]!='\\')
    {
        return -1;
    }
    else
    {
        //分离path  enter 
        while(posi < path.length())
        {
            string split=""; int curlen = 0;
            while(posi<path.length())
            {
                char s = path[posi];
                if(path[posi]!='\\')    split+=path[posi],posi++,curlen++;
                else
                {
                    posi++;
                    if(curlen==0)   {current = cur_bk; return -1;}
                    bool found = false;
                    for(int i = 0; i < ct[current].size(); i++)  
                        if(files[ct[current][i]].name == split) 
                        {
                            if(files[ct[current][i]].is_folder == false)  continue;
                            found = true;
                            current = ct[current][i];
                            break;
                        }
                    if(!found)  {current = cur_bk; return -1;}
                    break;
                }
            }
            history[htop = ++hcur] = current;
        }
        return 1;
    }
}
 
int back()
{
    if(hcur)
    {
        current = history[--hcur];
        return 1;
    }else
    {
        return -1;
    }
}
 
int fore()
{
    if(hcur>=htop)
    {
        return -1;
    }else
    {
        current = history[++hcur];
        return 1;
    }
}
 
int up()
{
    if(files[current].father == -1)   return -1;
    else
    {
        current = files[current].father;
        history[htop = ++hcur] = current;
    }
}
 
void init()
{
    for(int i = 0; i < 35; i++)   rem[i]="";
    root->id = 0; root->name = "exp"; root->father = -1; root->is_folder = true;
    history[0] = 0;
    current = 0;
}
 
#define Wrong printf("%s\n","WRONG COMMAND.");
 
int main()
{
    //freopen("explorer.in","r",stdin);
    //freopen("explorer.out","w",stdout);
    init();
    int n;
    scanf("%d", &n);
    while(n--)
    {
        string com;
        cin>>com;
        if(com=="back")
        {
            if(back()==-1)  Wrong;
            continue;
        }
        if(com=="fore")
        {
            if(fore()==-1)  Wrong;
            continue;
        }
        if(com=="up")
        {
            if(up()==-1)    Wrong;
            continue;
        }
        if(com=="print")
        {
            print(0,0);
            continue;
        }
        if(com=="new")
        {
            getchar();
            char comd[51]; bool isf = false; string fname = "";
            gets(comd);
           for(int i = 0; i < strlen(comd); i++)
            {  
                if(comd[i]==' ') 
                {
                    isf = true;
                    continue;
                }
                if(isf)
                {
                    fname += comd[i];
                }
            }
            if(isf)
            {
                switch(comd[0])
                {
                    case '0':
                        if(comd[1]!=' ')
                        {
                            Wrong;
                            continue;
                        }
                        isf=false;
                        break;
                    case '1':
                        if(comd[1]!=' ')
                        {
                            Wrong;
                            continue;
                        }
                        break;
                    default:
                        Wrong;
                        continue;
                }
            }else
            {
                for(int i = 0; i < strlen(comd); i++)
                    fname += comd[i];
            }
            if(newFile(isf,fname)==-1)  Wrong;
            continue;
        }
        if(com=="enter")
        {
            string path;
            cin>>path;
            if(enter(path)==-1) Wrong;
            continue;
        }
    }
     
}
 5    评论 举报收起

机智的小伟
2014-08-07 · TA获得超过153个赞
关注
/*链表操作*/
#include"stdio.h"
#include"stdlib.h"
typedef struct node
{
int data;
struct node *next;
} node; /* 构造节点 */
typedef struct list
{
node *head;
node *tail;
int length;
} list; /* 链表属性 */
void createl(list * l)
{
node *p, *t;
int x;
p = l->tail; /* 新元素接到链尾 */
while (1)
{
scanf("%d", &x);
if (x == 0)
break; /* 以0作为结束标志 */
t = (node *) malloc(sizeof(node));
t->data = x;
t->next = NULL;
p->next = t;
p = t;
l->tail = l->tail->next; /* 尾指针后移 */
l->length++; /* 链长自增一 */
}
}

void initiatel(list * l) /* 初始化链表函数 */
{
node *t;
if (l->head == NULL)
{
t = (node *) malloc(sizeof(node));
l->head = t;
t->next = NULL;
l->tail = l->head;
l->length = 0;
} /* 给head分配空间 */
else
{
printf("the list has been initiated or unknown error\n");
return;
}
}

void insertl_at_end(list * l, int x) /* 在链表末尾添加整数 */
{
node *t;
t = (node *) malloc(sizeof(node));
t->data = x;
t->next = NULL;
l->tail->next = t;
l->tail = t; /* 尾指针后移 */
l->length++;
}

void deletel_figure(list * l, int x) /* 删除特定节点 */
{
node *p, *t;
int j;
j = 1;
p = l->head;
if (p == NULL)
return;
while (p->next != NULL && p->next->data != x)
{
p = p->next;
j++;
} /* p指向最后一个节点或x的前一个节点 */
if (p->next == NULL)
return; /* 链表中不含x */
t = p->next;
p->next = t->next;
free(t); /* 删除值为x的节点 */
l->length--;
printf("\n删除的是第%d个元素\n", j);
return;
}

void printfl(list * l) /* 输出链表 */
{
node *p;
p = l->head;
printf("链表长度：%d\n", l->length);
printf("链表为：\n");
while (p->next != NULL)
{
printf("%4d", p->next->data);
p = p->next;
}
}

void main()
{
list l;
int x, temp; /* temp存表长，用于判断 */
l.head = NULL;
initiatel(&l);
printf("请输入一列整数，以0结束\n");
createl(&l);
printf("请输入待插入或删除的数\n");
scanf("%d", &x);
printf("操作前的链表：\n");
printfl(&l);
temp = l.length;
deletel_figure(&l, x);
if (l.length != temp) /* 判断是否执行了删除操作 */

{
printf("删除后的链表：\n");
printfl(&l);
}
else
{
insertl_at_end(&l, x);
printf("\n插入后的链表：\n");
printfl(&l);
}
}

因为这是很久以前我学C语言时写的代码，忘了这个是不死有bug的，所以我再发一个以前的哈
第二个
#include"stdio.h"
struct student
{
long int num;
char name[20];
int grade;
};
main()
{
int i=0,a=0,b=0,c=0,d=0,e=0;
struct student stu[10];
for(i=0;i<10;i++)
{printf("请输入笫%d个人的学号,姓名,成绩.\n",i+1);
scanf("%ld%s%d",&stu[i].num,&stu[i].name,&stu[i].grade);};
for(i=0;i<10;i++)
{
switch((int)(stu[i].grade/10))
{case 10:
case 9:a++;break;
case 8:b++;break;
case 7:c++;break;
case 6:d++;break;
default:e++;break;};
if(stu[i].grade<60)
printf("不及格的人信息如下:\n%ld %s %d\n",stu[i].num,stu[i].name,stu[i].grade);
};
printf("%d%d%d%d%d\n",a,b,c,d,e);
printf("90~100 ");
for(i=0;i<a;i++)
printf("*");
printf("\n80~89 ");
for(i=0;i<b;i++)
printf("*");
printf("\n70~79 ");
for(i=0;i<c;i++)
printf("*");
printf("\n60~69 ");
for(i=0;i<d;i++)
printf("*");
printf("\n<60 ");
for(i=0;i<e;i++)
printf("*");
printf("\n");
}
 1    评论 举报收起

肖焱淼
2014-08-07 · TA获得超过162个赞
关注
#define TRUE 1
#include <stdio.h>
void main(){
int a;

int *p;

int *p1;

int *p2;

int *p3;
...

int *p100000000;

int i=0;

for(;i<10000;i++){
p1=&a;

p2=p1;

p3=p2;

...

p100000000=p99999999;

}

while(TRUE){

}

}
 本回答被网友采纳
 1    评论 举报
收起 1条折叠回答
 其他类似问题
2017-07-03求一个C语言代码
2019-06-26求C语言长整数计算程序
2011-12-21求一段C语言程序代码，内容是学生信息管理系统，代码不要太长，...
2015-05-12求一段C语言程序代码
2014-08-11c语言代码，输入一个半径，求圆的周长，面积，球面积，球体积，...  6
2015-07-06求大神讲解一个比较难得C语言程序  1
2016-10-20判断一个数是否是素数,为什么只要除到根号那个数就够了 ，求C... 50
2017-06-27学了一学期的C语言，要做大作业。 求一个500行C语言程序代... 21
更多类似问题 >
特别推荐
“网络厕所”会造成什么影响？
华强北的二手手机是否靠谱？
癌症的治疗费用为何越来越高？
新生报道需要注意什么？

新手帮助
如何答题获取采纳使用财富值
玩法介绍
知道商城合伙人认证
投诉建议
意见反馈账号申诉非法信息举报
京ICP证030173号-1   京网文【2023】1034-029号     ©2025Baidu  使用百度前必读 | 知道协议 | 企业推广

辅 助模 式
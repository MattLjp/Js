var VERSION_TITLE = "芭芭农场自动集肥料脚本" + AUTHOR
var VERSION_DESCP = "仅用于个开发娱乐"
var AUTHOR = "泡面和卤蛋"
var VERSION = "v1.0"
/**
* 悬浮窗或吐司输出
*/
function printLog(msg, level) {
    switch (level) {
        case -2:
            toast(msg)
            break
        case -1:
            toast(msg);
            console.log(msg)
            break
        case 0:
            console.info(msg)
            break
        case 1:
            console.log(msg)
            break
        case 2:
            console.warn(msg)
            break
        case 3:
            console.error(msg)
        default:
            break
    }
}

/**
* 初始化弹窗
*/
function init() {
    var info = confirm(VERSION_TITLE, VERSION_DESCP)
    if (info == 0) close()

    auto.waitFor()

    // 设置屏幕尺寸
    setScreenMetrics(device.width, device.height)

    // 开启日志悬浮框
    console.show();
    printLog("脚本即将启动，请确保为当前软件开启[无障碍功能]与[悬浮窗]功能", 1)
    printLog("作者：" + AUTHOR, 0)
    printLog("当前版本：" + VERSION, 0)
}

function run_task() {
    launch("com.eg.android.AlipayGphone")
    printLog("正在打开支付宝", 1)
    waitForActivity("com.eg.android.AlipayGphone.AlipayLogin")
    var button = className("android.widget.TextView").test("芭芭农场").findOne()
    if (button != null) {
        button.click()
    } else {
        className("android.widget.TextView").test("全部").findOne().click()
        randomSleep(2000, 1000);
        waitForActivity("com.alipay.android.phone.homemarket.marketnew.AppManageActivity")
        button = className("android.widget.TextView").test("芭芭农场").findOne()
        while (button == null) {
            swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, 1000);
            button = className("android.widget.TextView").test("芭芭农场").findOne()
        }
        button.click()
    }
    randomSleep(3000, 1000)
    text("点击领取").waitFor()
    text("点击领取").findOne.click()
    randomSleep(1000, 1000)
    while(!text("去集肥料").exists()){
        text("施肥").findOne.click()
        randomSleep(1000, 1000)
    }
    text("去集肥料").findOne.click()
    
}


//随机睡眠
function randomSleep(base, range) {
    sleep(base + Math.floor(Math.random() * range))
}
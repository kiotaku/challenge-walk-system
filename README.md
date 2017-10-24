# Challenge Walk system

# 仕様
## 機能
- [ ] ユーザーがチェックポイントを通過したかが分かるように
- [ ] スタッフがチェックポイント通過処理を行えるように
- [ ] 誰が今どのあたりか出せるように
- [ ] 可能であればリタイヤ処理を参加者側が行えるように

## DB
### ユーザー
* ~~名前~~
* 識別番号(QR用)
* 状態(参加中、リタイヤ、完走済み)

### チェックポイント
* 名前
* 次のチェックポイント

### チェックポイントの状態
ユーザーIDとチェックポイントIDで一意に特定できるように
* ユーザーID
* チェックポイントID
* 状態(通過済み、未通過、リタイヤ)


## 画面仕様
### チェックポイント画面
* チェックポイントを選ぶまたは、特定のチェックポイントの画面にログインする
* QRコードを読み込み、チェックポイントの状態を通過済みへ変更する
![](https://raw.githubusercontent.com/kiotaku/challenge-walk-system/master/readme-img/check_point-flow.png?token=AKsC9o39oqjqXgnlVqfnZgc46wjGo0_hks5Z9K6CwA%3D%3D)

### ユーザー状態確認画面
* 初期状態ではすべてのユーザーの状態を一覧にし表示する
* ユーザーIDにより検索はできるように
* 可能であれば特定のチェックポイントの状態を条件にして絞り込み可能に
* 出力機能は必要かも？出力する場合、どのようなデータを出力するのか
![](https://raw.githubusercontent.com/kiotaku/challenge-walk-system/master/readme-img/retire-flow.png?token=AKsC9q0i0NS-hsIPJOBYtU4AefUwWFjgks5Z9K6owA%3D%3D)

### リタイヤ画面
* QRコードを読み込み、確認画面を表示した後ユーザーの状態をリタイヤにし未通過のチェックポイントをリタイヤ状態に変更する
* Web上でのQRコード読み込みライブラリがApple WebKitの実装状況が間に合っていないためIOSで失敗するためIOSでも動作するように変更する必要あり
* 少なくとも識別番号を入力できるようにするのは良くない
![](https://raw.githubusercontent.com/kiotaku/challenge-walk-system/master/readme-img/user-status-flow.png?token=AKsC9lBDVNKBFqFUbIf1p5VCJHDGvxhuks5Z9K66wA%3D%3D)

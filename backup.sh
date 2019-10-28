#back up dist files to backup with name of $(sitename + date + version)
#tar -zcvf www.hujiangtao.cn_$(date +"%Y-%m-%d")_v2.tar ../dist
backup_from=docs/.vuepress/dist
backup_to=docs/.vuepress/backup/www.hujiangtao.cn_$(date +"%Y-%m-%d")_v2.tar
tar -zcf $backup_to $backup_from
echo "============="
echo "back up to $backup_to complete!"
echo "---备份完毕---"

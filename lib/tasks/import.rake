require 'roo'

namespace :import do
  desc "import data"
  task data: :environment do
    puts "deleting hitters & pitchers"
    Pitcher.delete_all
    Hitter.delete_all
    puts "deleted all data"
    puts 'Importing Data for Pitchers vs LHP'
    data = Roo::Spreadsheet.open('lib/Pitchers vs L 2020-23 Linked.ods')
    (2..data.last_row).each do |row|
      record = data.row(row)
      Pitcher.create(name: record[0], team: record[1], throw_hand: record[2], ip_vs_l: record[3], woba_vs_l: record[4], kpct_vs_l: record[5], bbpct_vs_l: record[6], xfip_vs_l: record[7], hard_contact_pct_vs_l: record[8], soft_contact_pct_vs_l: record[9], hr_per_fb_vs_l: record[10], babip_vs_l: record[11], gbpct_vs_l: record[12], ldpct_vs_l: record[13], fbpct_vs_l: record[14], slg_vs_l: record[15], avg_vs_l: record[16], iso_vs_l: record[17])
    end
  end
  task data: :environment do
    puts 'Importing Data for Pitchers vs RHP'
    data = Roo::Spreadsheet.open('lib/Pitchers vs R 2020-23 Linked.ods')
    (2..data.last_row).each do |row|
      record = data.row(row)
      pitcher = Pitcher.all.find_by(name: record[0])
      if pitcher
        pitcher.update(ip_vs_r: record[3], woba_vs_r: record[4], kpct_vs_r: record[5], bbpct_vs_r: record[6], xfip_vs_r: record[7], hard_contact_pct_vs_r: record[8], soft_contact_pct_vs_r: record[9], hr_per_fb_vs_r: record[10], babip_vs_r: record[11], gbpct_vs_r: record[12], ldpct_vs_r: record[13], fbpct_vs_r: record[14], slg_vs_r: record[15], avg_vs_r: record[16], iso_vs_r: record[17])
      else
        Pitcher.create(name: record[0], team: record[1], throw_hand: record[2], ip_vs_l: record[3], woba_vs_l: record[4], kpct_vs_l: record[5], bbpct_vs_l: record[6], xfip_vs_l: record[7], hard_contact_pct_vs_l: record[8], soft_contact_pct_vs_l: record[9], hr_per_fb_vs_l: record[10], babip_vs_l: record[11], gbpct_vs_l: record[12], ldpct_vs_l: record[13], fbpct_vs_l: record[14], slg_vs_l: record[15], avg_vs_l: record[16], iso_vs_l: record[17])
      end
    end
  end
  task data: :environment do
    puts 'Importing Data for Hitters vs RHP'
    data = Roo::Spreadsheet.open('lib/Hitters vs R 2020-23 Linked.ods')
    (2..data.last_row).each do |row|
      record = data.row(row)
      Hitter.create(name: record[0], team: record[1], bat_hand: record[2],
        pa_vs_r: record[3], kpct_vs_r: record[4], iso_vs_r: record[5], woba_vs_r: record[6], wrc_plus_vs_r: record[7], hard_contact_pct_vs_r: record[8], hr_per_fb_vs_r: record[9], ldpct_vs_r: record[10], gbpct_vs_r: record[11], fbpct_vs_r: record[12], babip_vs_r: record[13], ex_woba_vs_r: 0.0, ex_iso_vs_r: 0.0, ex_hard_contact_vs_r: 0.0, ex_hr_per_fb_vs_r: 0.0, matchup_rating_vs_r: 0.0)
    end
  end
  task data: :environment do
    puts 'Importing Data for Hitters vs LHP'
    data = Roo::Spreadsheet.open('lib/Hitters vs L 2020-23 Linked.ods')
    (2..data.last_row).each do |row|
      record = data.row(row)
      hitter = Hitter.all.find_by(name: record[0])
      if hitter
        hitter.update(name: record[0], team: record[1], bat_hand: record[2],
        pa_vs_l: record[3], kpct_vs_l: record[4], iso_vs_l: record[5], woba_vs_l: record[6], wrc_plus_vs_l: record[7], hard_contact_pct_vs_l: record[8], hr_per_fb_vs_l: record[9], ldpct_vs_l: record[10], gbpct_vs_l: record[11], fbpct_vs_l: record[12], babip_vs_l: record[13], ex_woba_vs_l: 0.0, ex_iso_vs_l: 0.0, ex_hard_contact_vs_l: 0.0, ex_hr_per_fb_vs_l: 0.0, matchup_rating_vs_l: 0.0)
      else
        Hitter.create(name: record[0], team: record[1], bat_hand: record[2],
        pa_vs_l: record[3], kpct_vs_l: record[4], iso_vs_l: record[5], woba_vs_l: record[6], wrc_plus_vs_l: record[7], hard_contact_pct_vs_l: record[8], hr_per_fb_vs_l: record[9], ldpct_vs_l: record[10], gbpct_vs_l: record[11], fbpct_vs_l: record[12], babip_vs_l: record[13], ex_woba_vs_l: 0.0, ex_iso_vs_l: 0.0, ex_hard_contact_vs_l: 0.0, ex_hr_per_fb_vs_l: 0.0, matchup_rating_vs_l: 0.0)
      end
    end
  end
end
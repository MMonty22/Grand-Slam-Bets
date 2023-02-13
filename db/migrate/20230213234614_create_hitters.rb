class CreateHitters < ActiveRecord::Migration[6.1]
  def change
    create_table :hitters do |t|
      t.integer :game_id
      t.string :name
      t.string :team
      t.string :bat_hand
      t.integer :pa_vs_l
      t.float :kpct_vs_l
      t.float :iso_vs_l
      t.float :woba_vs_l
      t.integer :wrc_plus_vs_l
      t.float :hard_contact_pct_vs_l
      t.float :hr_per_fb_vs_l
      t.float :ldpct_vs_l
      t.float :gbpct_vs_l
      t.float :fbpct_vs_l
      t.float :babip_vs_l
      t.float :ex_woba_vs_l
      t.float :ex_iso_vs_l
      t.float :ex_hard_contact_vs_l
      t.float :ex_hr_per_fb_vs_l
      t.float :matchup_rating_vs_l
      t.integer :pa_vs_r
      t.float :kpct_vs_r
      t.float :iso_vs_r
      t.float :woba_vs_r
      t.integer :wrc_plus_vs_r
      t.float :hard_contact_pct_vs_r
      t.float :hr_per_fb_vs_r
      t.float :ldpct_vs_r
      t.float :gbpct_vs_r
      t.float :fbpct_vs_r
      t.float :babip_vs_r
      t.float :ex_woba_vs_r
      t.float :ex_iso_vs_r
      t.float :ex_hard_contact_vs_r
      t.float :ex_hr_per_fb_vs_r
      t.float :matchup_rating_vs_r

      t.timestamps
    end
  end
end

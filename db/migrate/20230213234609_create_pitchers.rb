class CreatePitchers < ActiveRecord::Migration[6.1]
  def change
    create_table :pitchers do |t|
      t.integer :game_id
      t.string :name
      t.string :team
      t.string :throw_hand
      t.integer :ip_vs_l
      t.float :woba_vs_l
      t.float :kpct_vs_l
      t.float :bbpct_vs_l
      t.float :xfip_vs_l
      t.float :hard_contact_pct_vs_l
      t.float :soft_contact_pct_vs_l
      t.float :hr_per_fb_vs_l
      t.float :babip_vs_l
      t.float :gbpct_vs_l
      t.float :ldpct_vs_l
      t.float :fbpct_vs_l
      t.float :slg_vs_l
      t.float :avg_vs_l
      t.float :iso_vs_l
      t.integer :ip_vs_r
      t.float :woba_vs_r
      t.float :kpct_vs_r
      t.float :bbpct_vs_r
      t.float :xfip_vs_r
      t.float :hard_contact_pct_vs_r
      t.float :soft_contact_pct_vs_r
      t.float :hr_per_fb_vs_r
      t.float :babip_vs_r
      t.float :gbpct_vs_r
      t.float :ldpct_vs_r
      t.float :fbpct_vs_r
      t.float :slg_vs_r
      t.float :avg_vs_r
      t.float :iso_vs_r

      t.timestamps
    end
  end
end

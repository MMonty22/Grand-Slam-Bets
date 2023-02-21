# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_02_20_222657) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bets", force: :cascade do |t|
    t.integer "user_id"
    t.integer "game_id"
    t.string "category"
    t.string "description"
    t.string "odds"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "result"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "bet_id"
    t.integer "user_id"
    t.string "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "games", force: :cascade do |t|
    t.string "away_team"
    t.string "home_team"
    t.string "away_team_SP"
    t.string "home_team_SP"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hitters", force: :cascade do |t|
    t.integer "game_id"
    t.string "name"
    t.string "team"
    t.string "bat_hand"
    t.integer "pa_vs_l"
    t.float "kpct_vs_l"
    t.float "iso_vs_l"
    t.float "woba_vs_l"
    t.integer "wrc_plus_vs_l"
    t.float "hard_contact_pct_vs_l"
    t.float "hr_per_fb_vs_l"
    t.float "ldpct_vs_l"
    t.float "gbpct_vs_l"
    t.float "fbpct_vs_l"
    t.float "babip_vs_l"
    t.float "ex_woba_vs_l"
    t.float "ex_iso_vs_l"
    t.float "ex_hard_contact_vs_l"
    t.float "ex_hr_per_fb_vs_l"
    t.float "matchup_rating_vs_l"
    t.integer "pa_vs_r"
    t.float "kpct_vs_r"
    t.float "iso_vs_r"
    t.float "woba_vs_r"
    t.integer "wrc_plus_vs_r"
    t.float "hard_contact_pct_vs_r"
    t.float "hr_per_fb_vs_r"
    t.float "ldpct_vs_r"
    t.float "gbpct_vs_r"
    t.float "fbpct_vs_r"
    t.float "babip_vs_r"
    t.float "ex_woba_vs_r"
    t.float "ex_iso_vs_r"
    t.float "ex_hard_contact_vs_r"
    t.float "ex_hr_per_fb_vs_r"
    t.float "matchup_rating_vs_r"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "pitchers", force: :cascade do |t|
    t.integer "game_id"
    t.string "name"
    t.string "team"
    t.string "throw_hand"
    t.integer "ip_vs_l"
    t.float "woba_vs_l"
    t.float "kpct_vs_l"
    t.float "bbpct_vs_l"
    t.float "xfip_vs_l"
    t.float "hard_contact_pct_vs_l"
    t.float "soft_contact_pct_vs_l"
    t.float "hr_per_fb_vs_l"
    t.float "babip_vs_l"
    t.float "gbpct_vs_l"
    t.float "ldpct_vs_l"
    t.float "fbpct_vs_l"
    t.float "slg_vs_l"
    t.float "avg_vs_l"
    t.float "iso_vs_l"
    t.integer "ip_vs_r"
    t.float "woba_vs_r"
    t.float "kpct_vs_r"
    t.float "bbpct_vs_r"
    t.float "xfip_vs_r"
    t.float "hard_contact_pct_vs_r"
    t.float "soft_contact_pct_vs_r"
    t.float "hr_per_fb_vs_r"
    t.float "babip_vs_r"
    t.float "gbpct_vs_r"
    t.float "ldpct_vs_r"
    t.float "fbpct_vs_r"
    t.float "slg_vs_r"
    t.float "avg_vs_r"
    t.float "iso_vs_r"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "wins"
    t.integer "losses"
  end

end

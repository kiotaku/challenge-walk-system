class CreateCheckPointStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :check_point_statuses, id: :uuid do |t|
      t.uuid :user_id
      t.uuid :check_point_id
      t.string :status, default: 'not pass'

      t.timestamps
    end
    add_foreign_key :check_point_statuses, :users, foreign_key: :user_id, dependent: :delete
    add_foreign_key :check_point_statuses, :check_points, foreign_key: :check_point_id, dependent: :delete
  end
end
